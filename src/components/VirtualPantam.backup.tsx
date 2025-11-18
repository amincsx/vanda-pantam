'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VirtualPantamProps {
  productId: number;
}

interface NoteMapping {
  [key: string]: string;
}

interface AudioBuffers {
  [key: string]: AudioBuffer;
}

export default function VirtualPantam({ productId }: VirtualPantamProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<AudioBuffers>({});
  const svgRef = useRef<SVGSVGElement>(null);

  // Note mappings for each product - currently only D Minor (product 1)
  const noteConfigs: { [key: number]: { folderPath: string; notes: NoteMapping } } = {
    1: {
      folderPath: '/D kord 9 note',
      notes: {
        '_0.D_ding': '0.D 3',
        '_1.A3': '1.A3',
        '_1.Bb3': '2.Bb3',
        '_1.C4': '3.C4',
        '_1.D4': '4.D4',
        '_1.E4': '5.E4',
        '_1.F4': '6.F4',
        '_1.G4': '7.G4',
        '_1.A4': '8.A4'
      }
    }
  };

  const config = noteConfigs[productId];
  
  if (!config) {
    return null;
  }

  // Initialize Web Audio API and preload all audio buffers
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create audio context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
        
        console.log('🎵 Audio Context created');
        
        // Load all audio files into buffers
        const loadPromises = Object.entries(config.notes).map(async ([noteId, audioFile]) => {
          try {
            const audioPath = `/D kord 9 note/${audioFile}.mp3`;
            console.log(`� Loading: ${audioPath}`);
            
            const response = await fetch(audioPath);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);
            
            audioBuffersRef.current[noteId] = audioBuffer;
            console.log(`✅ Loaded: ${noteId}`);
          } catch (error) {
            console.error(`❌ Error loading ${noteId}:`, error);
          }
        });
        
        await Promise.all(loadPromises);
        console.log(`🎵 All audio loaded! Total: ${Object.keys(audioBuffersRef.current).length}`);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Audio initialization error:', error);
        setIsLoading(false);
      }
    };

    initAudio();
    
    // Cleanup
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [config]);

  // Play note using Web Audio API - ZERO latency
  const playNote = (noteId: string) => {
    console.log(`🎵 playNote called with: ${noteId}`);
    
    // Visual feedback immediately - very fast animation
    setActiveNote(noteId);
    setTimeout(() => setActiveNote(null), 150);
    
    const audioBuffer = audioBuffersRef.current[noteId];
    const audioContext = audioContextRef.current;
    
    console.log(`🔊 Buffer exists: ${!!audioBuffer}, Context exists: ${!!audioContext}`);
    console.log(`🔊 Context state: ${audioContext?.state}`);
    
    if (!audioBuffer || !audioContext) {
      console.error(`❌ Missing buffer or context for ${noteId}`);
      console.log('Available buffers:', Object.keys(audioBuffersRef.current));
      return;
    }
    
    try {
      // Resume audio context if suspended (browser policy)
      if (audioContext.state === 'suspended') {
        console.log('🔓 Resuming audio context...');
        audioContext.resume();
      }
      
      // Create buffer source (can be played immediately)
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.8;
      
      // Connect: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Play immediately - zero latency!
      source.start(0);
      
      console.log(`✅ Playing: ${noteId}`);
    } catch (error) {
      console.error(`❌ Playback error for ${noteId}:`, error);
    }
  };

  const handleNoteClick = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const target = event.target as SVGElement;
    console.log('🖱️ Clicked element:', target.tagName, target.id);
    
    // Try to find the note element
    const noteElement = target.closest('ellipse[id*="_"]') as SVGElement;
    
    console.log('🎯 Found note element:', noteElement?.id);
    
    if (noteElement && noteElement.id) {
      console.log('🎵 Attempting to play:', noteElement.id);
      playNote(noteElement.id);
    } else {
      console.log('❌ No note element found from click');
    }
  };

  const handleNoteHover = (event: React.MouseEvent<SVGElement>) => {
    const target = event.target as SVGElement;
    const noteElement = target.closest('[id*="_"]') as SVGElement;
    
    if (noteElement) {
      noteElement.style.filter = 'brightness(1.3) drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))';
      noteElement.style.transition = 'all 0.15s ease';
    }
  };

  const handleNoteLeave = (event: React.MouseEvent<SVGElement>) => {
    const target = event.target as SVGElement;
    const noteElement = target.closest('[id*="_"]') as SVGElement;
    
    if (noteElement) {
      noteElement.style.filter = 'none';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Virtual Pantam</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <span className="ml-2 text-gray-300">Loading virtual pantam...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Virtual Pantam</h3>
      <p className="text-gray-300 text-sm mb-4">
        Click on any note to hear how it sounds. Hover over notes to see them highlighted.
      </p>
      
      <div className="relative w-full max-w-lg mx-auto">
        {/* Background PNG */}
        <div className="relative w-full aspect-square">
          <Image
            src={`${config.folderPath}/D KORD 9 NOTE.png`}
            alt="Handpan D Minor Layout"
            fill
            className="object-contain rounded-lg"
          />
          
          {/* Interactive SVG overlay */}
          <div className="absolute inset-0">
            <svg
              ref={svgRef}
              viewBox="0 0 1080 1080"
              className="w-full h-full"
              onMouseOver={handleNoteHover}
              onMouseLeave={handleNoteLeave}
            >
              {/* Note circles - made interactive */}
              <ellipse 
                id="_0.D_ding" 
                cx="567.29" 
                cy="579.39" 
                rx="113.32" 
                ry="149.16" 
                transform="translate(-32.7 1124.85) rotate(-87.88)" 
                onClick={() => playNote('_0.D_ding')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_0.D_ding' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.A3" 
                cx="593.02" 
                cy="876.81" 
                rx="97.62" 
                ry="83.82" 
                onClick={() => playNote('_1.A3')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.A3' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.Bb3" 
                cx="318.95" 
                cy="771.75" 
                rx="92.37" 
                ry="104.18" 
                transform="translate(-495.2 586) rotate(-54.69)" 
                onClick={() => playNote('_1.Bb3')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.Bb3' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.C4" 
                cx="825.94" 
                cy="743.77" 
                rx="82.54" 
                ry="64.43" 
                transform="translate(-258.38 987.94) rotate(-54.69)" 
                onClick={() => playNote('_1.C4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.C4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.D4" 
                cx="226.58" 
                cy="528.07" 
                rx="79.53" 
                ry="90.22" 
                onClick={() => playNote('_1.D4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.D4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.E4" 
                cx="876.4" 
                cy="511.08" 
                rx="67.49" 
                ry="83.82" 
                onClick={() => playNote('_1.E4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.E4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.F4" 
                cx="344.37" 
                cy="302.93" 
                rx="80.35" 
                ry="74.05" 
                transform="translate(-109.91 366.06) rotate(-49.25)" 
                onClick={() => playNote('_1.F4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.F4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.G4" 
                cx="772.58" 
                cy="316.47" 
                rx="70.27" 
                ry="65.35" 
                transform="translate(427.73 1076.81) rotate(-87.88)" 
                onClick={() => playNote('_1.G4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.G4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              <ellipse 
                id="_1.A4" 
                cx="553.37" 
                cy="237.87" 
                rx="63.5" 
                ry="70.24" 
                onClick={() => playNote('_1.A4')}
                className={`fill-transparent stroke-yellow-400/60 stroke-2 hover:stroke-yellow-300 hover:fill-yellow-400/10 transition-all duration-75 cursor-pointer ${
                  activeNote === '_1.A4' ? 'stroke-yellow-300 stroke-4 fill-yellow-400/40' : ''
                }`}
              />
              
              {/* Note labels */}
              <text x="567.29" y="585" textAnchor="middle" className="fill-white text-lg font-bold pointer-events-none select-none">
                D3
              </text>
              <text x="825.94" y="750" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                C4
              </text>
              <text x="318.95" y="778" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                Bb3
              </text>
              <text x="226.58" y="535" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                D4
              </text>
              <text x="344.37" y="310" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                F4
              </text>
              <text x="772.58" y="323" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                G4
              </text>
              <text x="876.4" y="518" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                E4
              </text>
              <text x="593.02" y="884" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                A3
              </text>
              <text x="553.37" y="245" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                A4
              </text>
            </svg>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Experience the sound of each note by clicking on the handpan surface
          </p>
          
          {/* Debug info */}
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <p>Audio system ready - Click any note to play</p>
            {process.env.NODE_ENV === 'development' && (
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => {
                    if (audioContextRef.current && audioBuffersRef.current['_1.A3']) {
                      playNote('_1.A3');
                      alert('✅ Playing A3!');
                    } else {
                      alert('❌ Audio not loaded yet');
                    }
                  }}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs text-white"
                >
                  🔊 Test A3
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}