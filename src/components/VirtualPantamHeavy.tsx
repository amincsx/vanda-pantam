'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VirtualPantamProps {
    productId: number;
}

interface NoteMapping {
    [key: string]: string;
}

const noteConfigs: { [key: number]: { audioPath: string; notes: NoteMapping } } = {
    1: {
        audioPath: '/sounds',
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
    },
    2: {
        audioPath: '/sounds',
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
    },
    3: {
        audioPath: '/sounds',
        notes: {
            '_0.D_ding': '0.D 3',
            '_1.A3': '1.A3',
            '_1.Bb3': '2.Bb3',
            '_1.C4': '3.C4',
            '_1.D4': '4.D4',
            '_1.E4': '5.E4',
            '_1.F4': '6.F4',
            '_1.G4': '7.G4',
            '_1.A4': '8.A4',
            '_1.C5': '9.C5',
            '_1.D5': '10.D5',
            '_1.E5': '11.E5'
        }
    },
    4: {
        audioPath: '/sounds',
        notes: {
            '_0.D_ding': '0.D 3',
            '_1.A3': '1.A3',
            '_1.Bb3': '2.Bb3',
            '_1.C4': '3.C4',
            '_1.D4': '4.D4',
            '_1.E4': '5.E4',
            '_1.F4': '6.F4',
            '_1.G4': '7.G4',
            '_1.A4': '8.A4',
            '_1.C5': '9.C5',
            '_1.D5': '10.D5',
            '_1.E5': '11.E5',
            '_1.F5': '12.F5',
            '_1.A5': '13.A5'
        }
    },
    6: {
        audioPath: '/sounds',
        notes: {
            '_0.D_ding': '0.D 3',
            '_1.A3': '1.A3',
            '_1.Bb3': '2.Bb3',
            '_1.C4': '3.C4',
            '_1.D4': '4.D4',
            '_1.E4': '5.E4',
            '_1.F4': '6.F4',
            '_1.G4': '7.G4',
            '_1.A4': '8.A4',
            '_1.C5': '9.C5',
            '_1.D5': '10.D5',
            '_1.E5': '11.E5'
        }
    }
};

export default function VirtualPantam({ productId }: VirtualPantamProps) {
    const [activeNote, setActiveNote] = useState<string | null>(null);
    const [keyboardEnabled, setKeyboardEnabled] = useState(false);
    const [isPlayingSequence, setIsPlayingSequence] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [audioError, setAudioError] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBuffersRef = useRef<{ [key: string]: AudioBuffer }>({});
    const config = noteConfigs[productId];

    useEffect(() => {
        if (!config) {
            setIsLoading(false);
            return;
        }

        let cancelled = false;
        const context = new AudioContext();
        audioContextRef.current = context;
        audioBuffersRef.current = {};
        setIsLoading(true);
        setAudioError(false);

        const loadBuffers = async () => {
            try {
                const entries = await Promise.all(
                    Object.entries(config.notes).map(async ([noteId, fileName]) => {
                        const response = await fetch(`${config.audioPath}/${encodeURIComponent(fileName)}.mp3`);
                        if (!response.ok) {
                            throw new Error(`Failed to load note audio: ${response.status} ${response.url}`);
                        }
                        const buffer = await context.decodeAudioData(await response.arrayBuffer());
                        return [noteId, buffer] as const;
                    })
                );

                if (!cancelled) {
                    audioBuffersRef.current = Object.fromEntries(entries);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Unable to prepare virtual handpan audio.', error);
                if (!cancelled) {
                    setAudioError(true);
                    setIsLoading(false);
                }
            }
        };

        void loadBuffers();

        return () => {
            cancelled = true;
            audioBuffersRef.current = {};
            audioContextRef.current = null;
            void context.close().catch(error => {
                console.error('Unable to close virtual handpan audio context.', error);
            });
        };
    }, [config]);

    const playNote = (noteId: string) => {
        setActiveNote(noteId);
        setTimeout(() => setActiveNote(null), 150);

        const context = audioContextRef.current;
        const buffer = audioBuffersRef.current[noteId];
        if (!context || !buffer) {
            console.error(`Virtual handpan audio is not ready for note: ${noteId}`);
            return;
        }

        if (context.state === 'suspended') {
            void context.resume().catch(error => {
                console.error('Unable to resume virtual handpan audio.', error);
            });
        }

        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        gain.gain.value = 0.8;
        source.connect(gain);
        gain.connect(context.destination);
        source.start();
    };

    // Handle audio context activation (required by browsers)
    const activateAudioContext = async () => {
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            try {
                await audioContextRef.current.resume();
                console.log('🎵 Audio Context activated');
            } catch (error) {
                console.error('Failed to activate audio context:', error);
            }
        }
    };

    const handleNoteHover = (event: React.MouseEvent<SVGElement>) => {
        const target = event.target as SVGElement;
        const noteElement = target.closest('[id*="_"]') as SVGElement;

        if (noteElement) {
            noteElement.style.filter = 'brightness(1.5) drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))';
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

    // Note display order - different for each product
    const noteButtons = (productId === 1 || productId === 2) ? [
        // Product 1 & 2: 9 notes
        { id: '_0.D_ding', label: 'D3', key: 'a' },
        { id: '_1.A3', label: 'A3', key: 's' },
        { id: '_1.Bb3', label: 'Bb3', key: 'd' },
        { id: '_1.C4', label: 'C4', key: 'f' },
        { id: '_1.D4', label: 'D4', key: 'g' },
        { id: '_1.E4', label: 'E4', key: 'h' },
        { id: '_1.F4', label: 'F4', key: 'j' },
        { id: '_1.G4', label: 'G4', key: 'k' },
        { id: '_1.A4', label: 'A4', key: 'l' }
    ] : productId === 4 ? [
        // Product 4: 14 notes
        { id: '_0.D_ding', label: 'D3', key: 'a' },
        { id: '_1.A3', label: 'A3', key: 's' },
        { id: '_1.Bb3', label: 'Bb3', key: 'd' },
        { id: '_1.C4', label: 'C4', key: 'f' },
        { id: '_1.D4', label: 'D4', key: 'g' },
        { id: '_1.E4', label: 'E4', key: 'h' },
        { id: '_1.F4', label: 'F4', key: 'j' },
        { id: '_1.G4', label: 'G4', key: 'k' },
        { id: '_1.A4', label: 'A4', key: 'l' },
        { id: '_1.C5', label: 'C5', key: 'z' },
        { id: '_1.D5', label: 'D5', key: 'x' },
        { id: '_1.E5', label: 'E5', key: 'c' },
        { id: '_1.F5', label: 'F5', key: 'v' },
        { id: '_1.A5', label: 'A5', key: 'b' }
    ] : [
        // Product 3 & 6: 12 notes
        { id: '_0.D_ding', label: 'D3', key: 'a' },
        { id: '_1.A3', label: 'A3', key: 's' },
        { id: '_1.Bb3', label: 'Bb3', key: 'd' },
        { id: '_1.C4', label: 'C4', key: 'f' },
        { id: '_1.D4', label: 'D4', key: 'g' },
        { id: '_1.E4', label: 'E4', key: 'h' },
        { id: '_1.F4', label: 'F4', key: 'j' },
        { id: '_1.G4', label: 'G4', key: 'k' },
        { id: '_1.A4', label: 'A4', key: 'l' },
        { id: '_1.C5', label: 'C5', key: 'z' },
        { id: '_1.D5', label: 'D5', key: 'x' },
        { id: '_1.E5', label: 'E5', key: 'c' }
    ];

    // Play all notes sequentially
    const playSequence = async () => {
        if (isPlayingSequence) return;

        setIsPlayingSequence(true);

        for (const note of noteButtons) {
            playNote(note.id);
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between notes
        }

        setIsPlayingSequence(false);
    };

    // Keyboard event handler
    useEffect(() => {
        if (!keyboardEnabled) return;

        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const noteMap: { [key: string]: string } = (productId === 1 || productId === 2) ? {
                // Product 1 & 2: 9 notes
                'a': '_0.D_ding',
                's': '_1.A3',
                'd': '_1.Bb3',
                'f': '_1.C4',
                'g': '_1.D4',
                'h': '_1.E4',
                'j': '_1.F4',
                'k': '_1.G4',
                'l': '_1.A4'
            } : productId === 4 ? {
                // Product 4: 14 notes
                'a': '_0.D_ding',
                's': '_1.A3',
                'd': '_1.Bb3',
                'f': '_1.C4',
                'g': '_1.D4',
                'h': '_1.E4',
                'j': '_1.F4',
                'k': '_1.G4',
                'l': '_1.A4',
                'z': '_1.C5',
                'x': '_1.D5',
                'c': '_1.E5',
                'v': '_1.F5',
                'b': '_1.A5'
            } : (productId === 3 || productId === 6) ? {
                // Product 3 & 6: 12 notes
                'a': '_0.D_ding',
                's': '_1.A3',
                'd': '_1.Bb3',
                'f': '_1.C4',
                'g': '_1.D4',
                'h': '_1.E4',
                'j': '_1.F4',
                'k': '_1.G4',
                'l': '_1.A4',
                'z': '_1.C5',
                'x': '_1.D5',
                'c': '_1.E5'
            } : {};

            const noteId = noteMap[key];
            if (noteId) {
                playNote(noteId);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [keyboardEnabled, config, productId]);

    if (isLoading) {
        return (
            <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-8 relative">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                    <div className="text-white text-lg" dir="rtl">آماده‌سازی سیستم صوتی...</div>
                </div>
            </div>
        );
    }

    if (!config || audioError) {
        return (
            <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-8 text-center text-white" dir="rtl">
                صدای پنتام مجازی بارگذاری نشد. لطفاً صفحه را دوباره بارگذاری کنید.
            </div>
        );
    }

    return (
        <div
            className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-8 relative"
            onClick={activateAudioContext} // Activate audio context on any click
        >
            {/* Info Modal Popup */}
            {showInfo && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowInfo(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/30 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-white" dir="rtl">
                                {productId === 1 ? 'درباره گام دی کورد' :
                                    productId === 2 ? 'درباره گام دی کورد' :
                                        productId === 3 ? 'درباره گام دی مینور ۱۲ نت' :
                                            productId === 4 ? 'درباره گام دی مینور ۱۴ نت' :
                                                'درباره گام اف ماژور'}
                            </h3>
                            <button
                                onClick={() => setShowInfo(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-gray-200 space-y-4">
                            {productId === 1 ? (
                                <div dir="rtl" className="text-right space-y-4">
                                    <p>
                                        دی کورد یکی از محبوب‌ترین و دوست‌داشتنی‌ترین گام‌های هندپن است. صدایی عمیق، مدیتیتیو و درون‌گرا دارد که با بسیاری از نوازندگان و شنوندگان ارتباط برقرار می‌کند.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">نت‌های گام:</strong> D3 / A3 Bb3 C4 D4 E4 F4 G4 A4
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">شخصیت:</strong> گام دی کورد فضایی عرفانی و احساسی ایجاد می‌کند که برای مدیتیشن، جلسات درمانی و قطعات موسیقی بیانگر عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">ریشه:</strong> این گام از خانواده گام‌های کورد/کردی گرفته شده است که به ویژگی‌های مینور، مالیخولیایی و در عین حال نشاط‌آور خود شناخته می‌شود.
                                    </p>
                                </div>
                            ) : productId === 2 ? (
                                <div dir="rtl" className="text-right space-y-4">
                                    <p>
                                        گام سی ماژور یک گام هندپن روشن، نشاط‌آور و همه کاره است. با ۱۴ نت، گستره‌ای وسیع برای ملودی‌های پیچیده و ترکیبات هارمونیک ارائه می‌دهد.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">نت‌های گام:</strong> D3 / A3 Bb3 C4 D4 E4 F4 G4 A4 C5 D5 E5 F5 A5
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">شخصیت:</strong> گام سی ماژور فضایی شاد و خوش‌بینانه ایجاد می‌کند که برای اجراهای زنده، قطعات نشاط‌آور و بیان‌های موسیقی پرانرژی عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">گستره:</strong> با ۱۴ نت که چندین اکتاو را پوشش می‌دهد، این ساز امکانات ملودی و غنای هارمونیک فوق‌العاده‌ای ارائه می‌دهد.
                                    </p>
                                </div>
                            ) : productId === 3 ? (
                                <div dir="rtl" className="text-right space-y-4">
                                    <p>
                                        گام لا مینور گلکسی یک هندپن عرفانی و متفکرانه با زیبایی‌شناسی کیهانی است. تن‌های عمیق و احساسی را ارائه می‌دهد که برای موسیقی درون‌گرا و اتمسفریک عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">نت‌های گام:</strong> D3 / A3 Bb3 C4 D4 E4 F4 G4 A4
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">شخصیت:</strong> گام لا مینور گلکسی فضایی عرفانی و ماورایی ایجاد می‌کند که برای مدیتیشن، قطعات امبینت و بیان‌های موسیقی احساسی عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">طراحی:</strong> دارای پوشش خیره‌کننده با تم کهکشان است که ماهیت کیهانی و متعالی این گام عمیقاً تأثیرگذار را منعکس می‌کند.
                                    </p>
                                </div>
                            ) : productId === 4 ? (
                                <div dir="rtl" className="text-right space-y-4">
                                    <p>
                                        گام سل ماژور یک گام هندپن متعادل، هماهنگ و درمانی است. با ۱۲ نت در ساختار فولادی، تنی گرم و طنین‌انداز ارائه می‌دهد که برای موسیقی آرام و آرامش‌بخش عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">نت‌های گام:</strong> D3 / A3 Bb3 C4 D4 E4 F4 G4 A4 C5 D5 E5
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">شخصیت:</strong> گام سل ماژور فضایی آرام و متعادل ایجاد می‌کند که برای جلسات درمانی، مدیتیشن و بیان‌های موسیقی آرام‌بخش ایده‌آل است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">مواد:</strong> ساخته شده از فولاد برای پایداری استثنایی و تن‌های گرم و طنین‌انداز که آرامش و شفا را ترویج می‌کند.
                                    </p>
                                </div>
                            ) : (
                                <div dir="rtl" className="text-right space-y-4">
                                    <p>
                                        گام اف ماژور یک هندپن پیچیده و ظریف با پوشش مشکی زیبا است. با ۱۲ نت، تن‌های غنی و پیچیده‌ای ارائه می‌دهد که برای اجراها و قطعات حرفه‌ای عالی است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">نت‌های گام:</strong> D3 / A3 Bb3 C4 D4 E4 F4 G4 A4 C5 D5 E5
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">شخصیت:</strong> گام اف ماژور فضایی ظریف و پیچیده ایجاد می‌کند که برای اجراهای حرفه‌ای، قطعات پیچیده و بیان‌های موسیقی ظریف ایده‌آل است.
                                    </p>
                                    <p>
                                        <strong className="text-yellow-400">طراحی:</strong> دارای پوشش مشکی خیره‌کننده است که ظرافت و پیچیدگی را تجسم می‌بخشد و آن را به انتخابی ممتاز برای نوازندگان دقیق تبدیل می‌کند.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Clickable notes at the top */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
                {noteButtons.map((note) => (
                    <button
                        key={note.id}
                        onClick={() => playNote(note.id)}
                        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-150 touch-target ${activeNote === note.id
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                            : 'text-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                            }`}
                    >
                        {note.label}
                        {keyboardEnabled && (
                            <span className="ml-2 text-xs opacity-70">({note.key.toUpperCase()})</span>
                        )}
                    </button>
                ))}
            </div>

            {/* All control buttons - horizontal at bottom center for all screens */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-row items-center gap-1.5 sm:gap-3">
                {/* Play Scale button */}
                <button
                    onClick={playSequence}
                    disabled={isPlayingSequence}
                    className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-5 sm:py-3 rounded-lg font-medium text-xs sm:text-base transition-all duration-200 touch-target ${isPlayingSequence
                        ? 'bg-yellow-500/40 text-white cursor-not-allowed'
                        : 'bg-yellow-500/20 text-white hover:bg-yellow-500/30 border border-yellow-500/40 hover:shadow-[0_0_10px_rgba(234,179,8,0.4)]'
                        }`}
                    title="پخش تمام نت‌ها به ترتیب"
                >
                    <svg
                        className={`w-3 h-3 sm:w-5 sm:h-5 ${isPlayingSequence ? 'animate-pulse' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="hidden sm:inline">{isPlayingSequence ? 'در حال پخش...' : 'پخش گام'}</span>
                </button>

                {/* About button */}
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-5 sm:py-3 rounded-lg font-medium text-xs sm:text-base transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] touch-target"
                    title="درباره این ساز"
                >
                    <svg
                        className="w-3 h-3 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="hidden sm:inline">درباره</span>
                </button>

                {/* Share button */}
                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: 'هندپن مجازی - گام دی کورد',
                                text: 'این هندپن مجازی تعاملی را بررسی کنید!',
                                url: window.location.href
                            }).catch(() => { });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('لینک کپی شد!');
                        }
                    }}
                    className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-5 sm:py-3 rounded-lg font-medium text-xs sm:text-base transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] touch-target"
                    title="اشتراک‌گذاری این صفحه"
                >
                    <svg
                        className="w-3 h-3 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="hidden sm:inline">اشتراک‌گذاری</span>
                </button>

                {/* Keyboard toggle button */}
                <div className="relative">
                    {keyboardEnabled && (
                        <div className="hidden sm:block absolute bottom-full mb-2 right-0 bg-white text-black px-3 py-1.5 rounded text-sm whitespace-nowrap shadow-lg">
                            اکنون می‌توانید با کیبورد کامپیوتر خود بنوازید
                        </div>
                    )}
                    <button
                        onClick={() => setKeyboardEnabled(!keyboardEnabled)}
                        className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-5 sm:py-3 rounded-lg font-medium text-xs sm:text-base transition-all duration-200 touch-target ${keyboardEnabled
                            ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                            : 'bg-yellow-500/20 text-white hover:bg-yellow-500/30 border border-yellow-500/40'
                            }`}
                    >
                        <svg
                            className="w-3 h-3 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2" />
                            <line x1="6" y1="10" x2="6" y2="10" strokeWidth="2" strokeLinecap="round" />
                            <line x1="10" y1="10" x2="10" y2="10" strokeWidth="2" strokeLinecap="round" />
                            <line x1="14" y1="10" x2="14" y2="10" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="10" x2="18" y2="10" strokeWidth="2" strokeLinecap="round" />
                            <line x1="8" y1="14" x2="16" y2="14" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="hidden sm:inline">{keyboardEnabled ? 'کیبورد روشن' : 'کیبورد'}</span>
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
                {/* Background image */}
                <div className="relative w-full aspect-square max-h-[500px] sm:max-h-[550px] transform -translate-y-4 sm:-translate-y-12">
                    <Image
                        src={productId === 1 ? `/D kord 9 note/D KORD 9 NOTE.webp` :
                            productId === 2 ? `/D kord 9 note/D KORD 9 NOTE.webp` :
                                productId === 3 ? `/black D kurd 12 note/black D kurd 12 note.webp` :
                                    productId === 4 ? `/D kurd 14 note/D kurd 14 note.webp` :
                                        `/black D kurd 12 note/black D kurd 12 note.webp`}
                        alt={productId === 1 ? "چیدمان هندپن دی مینور" :
                            productId === 2 ? "چیدمان هندپن دی مینور اکو" :
                                productId === 3 ? "چیدمان هندپن دی مینور ۱۲ نت" :
                                    productId === 4 ? "چیدمان هندپن دی مینور ۱۴ نت" :
                                        "چیدمان هندپن اف ماژور"}
                        fill
                        className="object-contain rounded-lg"
                        style={{ objectPosition: 'center top' }}
                    />

                    {/* Interactive SVG overlay */}
                    <div className="absolute inset-0">
                        <svg
                            ref={svgRef}
                            viewBox="0 0 1080 1080"
                            className="w-full h-full touch-none"
                            onMouseOver={handleNoteHover}
                            onMouseLeave={handleNoteLeave}
                        >
                            {/* Render notes based on product */}
                            {productId === 1 ? (
                                <>
                                    {/* Product 1: D Minor 9 notes */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="567.29"
                                        cy="579.39"
                                        rx="113.32"
                                        ry="149.16"
                                        transform="translate(-32.7 1124.85) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="593.02"
                                        cy="876.81"
                                        rx="97.62"
                                        ry="83.82"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="318.95"
                                        cy="771.75"
                                        rx="92.37"
                                        ry="104.18"
                                        transform="translate(-495.2 586) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="825.94"
                                        cy="743.77"
                                        rx="82.54"
                                        ry="64.43"
                                        transform="translate(-258.38 987.94) rotate(-54.69)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="226.58"
                                        cy="528.07"
                                        rx="79.53"
                                        ry="90.22"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="876.4"
                                        cy="511.08"
                                        rx="67.49"
                                        ry="83.82"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="344.37"
                                        cy="302.93"
                                        rx="80.35"
                                        ry="74.05"
                                        transform="translate(-109.91 366.06) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="772.58"
                                        cy="316.47"
                                        rx="70.27"
                                        ry="65.35"
                                        transform="translate(427.73 1076.81) rotate(-87.88)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="553.37"
                                        cy="237.87"
                                        rx="63.5"
                                        ry="70.24"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 1 */}
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
                                </>
                            ) : productId === 3 ? (
                                <>
                                    {/* Product 3: Black D Minor 12 notes */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="585.4"
                                        cy="604.45"
                                        rx="135.91"
                                        ry="167.51"
                                        transform="translate(-40.3 1167.08) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="585.4"
                                        cy="873.89"
                                        rx="97.62"
                                        ry="73.43"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="343.18"
                                        cy="784.8"
                                        rx="80.7"
                                        ry="96.14"
                                        transform="translate(-495.61 611.29) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="814.84"
                                        cy="759.68"
                                        rx="79.33"
                                        ry="68.03"
                                        transform="translate(-282.5 951.82) rotate(-52.93)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="246.76"
                                        cy="578.19"
                                        rx="72.52"
                                        ry="79.24"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="878.58"
                                        cy="576.65"
                                        rx="63.05"
                                        ry="80.78"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="304.25"
                                        cy="385.56"
                                        rx="72.13"
                                        ry="60.42"
                                        transform="translate(-186.44 364.35) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="817.38"
                                        cy="374.39"
                                        rx="63.66"
                                        ry="60.82"
                                        transform="translate(412.99 1177.36) rotate(-87.88)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="456.8"
                                        cy="250.92"
                                        rx="59.31"
                                        ry="41.35"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C5"
                                        cx="668.31"
                                        cy="249.69"
                                        rx="42.65"
                                        ry="60.69"
                                        transform="translate(394.06 908.31) rotate(-87.88)"
                                        onClick={() => playNote('_1.C5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D5"
                                        cx="485.56"
                                        cy="383.47"
                                        rx="54.52"
                                        ry="54.52"
                                        onClick={() => playNote('_1.D5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E5"
                                        cx="656.88"
                                        cy="386.98"
                                        rx="51.07"
                                        ry="55.82"
                                        onClick={() => playNote('_1.E5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 3 */}
                                    <text x="585.4" y="610" textAnchor="middle" className="fill-white text-lg font-bold pointer-events-none select-none">
                                        D3
                                    </text>
                                    <text x="814.84" y="765" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C4
                                    </text>
                                    <text x="668.31" y="255" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C5
                                    </text>
                                    <text x="343.18" y="790" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        Bb3
                                    </text>
                                    <text x="246.76" y="584" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D4
                                    </text>
                                    <text x="485.56" y="390" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D5
                                    </text>
                                    <text x="304.25" y="391" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        F4
                                    </text>
                                    <text x="817.38" y="380" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        G4
                                    </text>
                                    <text x="878.58" y="583" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E4
                                    </text>
                                    <text x="585.4" y="880" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A3
                                    </text>
                                    <text x="456.8" y="257" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A4
                                    </text>
                                    <text x="656.88" y="393" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E5
                                    </text>
                                </>
                            ) : productId === 2 ? (
                                <>
                                    {/* Product 2: D Minor 9 notes Echo */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="567.29"
                                        cy="579.39"
                                        rx="113.32"
                                        ry="149.16"
                                        transform="translate(-32.7 1124.85) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="593.02"
                                        cy="876.81"
                                        rx="97.62"
                                        ry="83.82"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="318.95"
                                        cy="771.75"
                                        rx="92.37"
                                        ry="104.18"
                                        transform="translate(-495.2 586) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="825.94"
                                        cy="743.77"
                                        rx="82.54"
                                        ry="64.43"
                                        transform="translate(-258.38 987.94) rotate(-54.69)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="226.58"
                                        cy="528.07"
                                        rx="79.53"
                                        ry="90.22"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="876.4"
                                        cy="511.08"
                                        rx="67.49"
                                        ry="83.82"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="344.37"
                                        cy="302.93"
                                        rx="80.35"
                                        ry="74.05"
                                        transform="translate(-109.91 366.06) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="772.58"
                                        cy="316.47"
                                        rx="70.27"
                                        ry="65.35"
                                        transform="translate(427.73 1076.81) rotate(-87.88)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="553.37"
                                        cy="237.87"
                                        rx="63.5"
                                        ry="70.24"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 2 */}
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
                                </>
                            ) : productId === 4 ? (
                                <>
                                    {/* Product 4: D Minor 14 notes */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="542.07"
                                        cy="601.02"
                                        rx="132.02"
                                        ry="170.3"
                                        transform="translate(-78.59 1120.47) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="545.96"
                                        cy="860.14"
                                        rx="97.62"
                                        ry="80.61"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="308.58"
                                        cy="770.07"
                                        rx="78.28"
                                        ry="103.48"
                                        transform="translate(-498.2 576.84) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="770.74"
                                        cy="762.43"
                                        rx="89.72"
                                        ry="69.98"
                                        transform="translate(-296.91 950.76) rotate(-54.69)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="213.56"
                                        cy="563.05"
                                        rx="67.12"
                                        ry="85.98"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="858.85"
                                        cy="582.5"
                                        rx="56.49"
                                        ry="83.82"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="250.44"
                                        cy="373.98"
                                        rx="74.31"
                                        ry="58.1"
                                        transform="translate(-196.35 319.57) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="828.45"
                                        cy="395.42"
                                        rx="50.2"
                                        ry="70.27"
                                        transform="translate(-84.88 303.17) rotate(-19.75)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="385.8"
                                        cy="248.04"
                                        rx="62.87"
                                        ry="54.29"
                                        transform="translate(-7.23 11.63) rotate(-1.71)"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C5"
                                        cx="712.41"
                                        cy="262.38"
                                        rx="46.11"
                                        ry="55.19"
                                        transform="translate(64.35 657.85) rotate(-51.61)"
                                        onClick={() => playNote('_1.C5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D5"
                                        cx="559.68"
                                        cy="207.23"
                                        rx="51.37"
                                        ry="42.71"
                                        onClick={() => playNote('_1.D5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E5"
                                        cx="699.86"
                                        cy="417.06"
                                        rx="46.62"
                                        ry="50.32"
                                        onClick={() => playNote('_1.E5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F5"
                                        cx="405.58"
                                        cy="408.45"
                                        rx="51.37"
                                        ry="47.38"
                                        onClick={() => playNote('_1.F5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A5"
                                        cx="553.47"
                                        cy="342.33"
                                        rx="51.37"
                                        ry="41.44"
                                        onClick={() => playNote('_1.A5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 4 */}
                                    <text x="542.07" y="610" textAnchor="middle" className="fill-white text-lg font-bold pointer-events-none select-none">
                                        D3
                                    </text>
                                    <text x="770.74" y="770" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C4
                                    </text>
                                    <text x="308.58" y="778" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        Bb3
                                    </text>
                                    <text x="213.56" y="571" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D4
                                    </text>
                                    <text x="250.44" y="382" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        F4
                                    </text>
                                    <text x="828.45" y="403" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        G4
                                    </text>
                                    <text x="858.85" y="590" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E4
                                    </text>
                                    <text x="545.96" y="868" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A3
                                    </text>
                                    <text x="385.8" y="256" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A4
                                    </text>
                                    <text x="712.41" y="270" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C5
                                    </text>
                                    <text x="559.68" y="215" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D5
                                    </text>
                                    <text x="699.86" y="425" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E5
                                    </text>
                                    <text x="405.58" y="416" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        F5
                                    </text>
                                    <text x="553.47" y="350" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A5
                                    </text>
                                </>
                            ) : productId === 6 ? (
                                <>
                                    {/* Product 6: F Major Black 12 notes */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="585.4"
                                        cy="604.45"
                                        rx="135.91"
                                        ry="167.51"
                                        transform="translate(-40.3 1167.08) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="585.4"
                                        cy="873.89"
                                        rx="97.62"
                                        ry="73.43"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="343.18"
                                        cy="784.8"
                                        rx="80.7"
                                        ry="96.14"
                                        transform="translate(-495.61 611.29) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="814.84"
                                        cy="759.68"
                                        rx="79.33"
                                        ry="68.03"
                                        transform="translate(-282.5 951.82) rotate(-52.93)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="246.76"
                                        cy="578.19"
                                        rx="72.52"
                                        ry="79.24"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="878.58"
                                        cy="576.65"
                                        rx="63.05"
                                        ry="80.78"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="304.25"
                                        cy="385.56"
                                        rx="72.13"
                                        ry="60.42"
                                        transform="translate(-186.44 364.35) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="817.38"
                                        cy="374.39"
                                        rx="63.66"
                                        ry="60.82"
                                        transform="translate(412.99 1177.36) rotate(-87.88)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="456.8"
                                        cy="250.92"
                                        rx="59.31"
                                        ry="41.35"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C5"
                                        cx="668.31"
                                        cy="249.69"
                                        rx="42.65"
                                        ry="60.69"
                                        transform="translate(394.06 908.31) rotate(-87.88)"
                                        onClick={() => playNote('_1.C5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D5"
                                        cx="485.56"
                                        cy="383.47"
                                        rx="54.52"
                                        ry="54.52"
                                        onClick={() => playNote('_1.D5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E5"
                                        cx="656.88"
                                        cy="386.98"
                                        rx="51.07"
                                        ry="55.82"
                                        onClick={() => playNote('_1.E5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 6 */}
                                    <text x="585.4" y="610" textAnchor="middle" className="fill-white text-lg font-bold pointer-events-none select-none">
                                        D3
                                    </text>
                                    <text x="814.84" y="765" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C4
                                    </text>
                                    <text x="668.31" y="255" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C5
                                    </text>
                                    <text x="343.18" y="790" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        Bb3
                                    </text>
                                    <text x="246.76" y="584" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D4
                                    </text>
                                    <text x="485.56" y="390" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D5
                                    </text>
                                    <text x="304.25" y="391" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        F4
                                    </text>
                                    <text x="817.38" y="380" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        G4
                                    </text>
                                    <text x="878.58" y="583" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E4
                                    </text>
                                    <text x="585.4" y="880" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A3
                                    </text>
                                    <text x="456.8" y="257" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A4
                                    </text>
                                    <text x="656.88" y="393" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E5
                                    </text>
                                </>
                            ) : productId === 6 ? (
                                <>
                                    {/* Product 6: F Major Black 12 notes */}
                                    <ellipse
                                        id="_0.D_ding"
                                        cx="585.4"
                                        cy="604.45"
                                        rx="135.91"
                                        ry="167.51"
                                        transform="translate(-40.3 1167.08) rotate(-87.88)"
                                        onClick={() => playNote('_0.D_ding')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_0.D_ding' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A3"
                                        cx="585.4"
                                        cy="873.89"
                                        rx="97.62"
                                        ry="73.43"
                                        onClick={() => playNote('_1.A3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.Bb3"
                                        cx="343.18"
                                        cy="784.8"
                                        rx="80.7"
                                        ry="96.14"
                                        transform="translate(-495.61 611.29) rotate(-54.69)"
                                        onClick={() => playNote('_1.Bb3')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.Bb3' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C4"
                                        cx="814.84"
                                        cy="759.68"
                                        rx="79.33"
                                        ry="68.03"
                                        transform="translate(-282.5 951.82) rotate(-52.93)"
                                        onClick={() => playNote('_1.C4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D4"
                                        cx="246.76"
                                        cy="578.19"
                                        rx="72.52"
                                        ry="79.24"
                                        onClick={() => playNote('_1.D4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E4"
                                        cx="878.58"
                                        cy="576.65"
                                        rx="63.05"
                                        ry="80.78"
                                        onClick={() => playNote('_1.E4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.F4"
                                        cx="304.25"
                                        cy="385.56"
                                        rx="72.13"
                                        ry="60.42"
                                        transform="translate(-186.44 364.35) rotate(-49.25)"
                                        onClick={() => playNote('_1.F4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.F4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.G4"
                                        cx="817.38"
                                        cy="374.39"
                                        rx="63.66"
                                        ry="60.82"
                                        transform="translate(412.99 1177.36) rotate(-87.88)"
                                        onClick={() => playNote('_1.G4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.G4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.A4"
                                        cx="456.8"
                                        cy="250.92"
                                        rx="59.31"
                                        ry="41.35"
                                        onClick={() => playNote('_1.A4')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.A4' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.C5"
                                        cx="668.31"
                                        cy="249.69"
                                        rx="42.65"
                                        ry="60.69"
                                        transform="translate(394.06 908.31) rotate(-87.88)"
                                        onClick={() => playNote('_1.C5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.C5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.D5"
                                        cx="485.56"
                                        cy="383.47"
                                        rx="54.52"
                                        ry="54.52"
                                        onClick={() => playNote('_1.D5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.D5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />
                                    <ellipse
                                        id="_1.E5"
                                        cx="656.88"
                                        cy="386.98"
                                        rx="51.07"
                                        ry="55.82"
                                        onClick={() => playNote('_1.E5')}
                                        className={`fill-white/10 stroke-white/80 stroke-[3] hover:stroke-white hover:fill-white/25 transition-all duration-150 cursor-pointer backdrop-blur-sm ${activeNote === '_1.E5' ? 'stroke-white stroke-[5] fill-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' : ''
                                            }`}
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
                                    />

                                    {/* Note labels for Product 6 */}
                                    <text x="585.4" y="610" textAnchor="middle" className="fill-white text-lg font-bold pointer-events-none select-none">
                                        D3
                                    </text>
                                    <text x="814.84" y="765" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C4
                                    </text>
                                    <text x="668.31" y="255" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        C5
                                    </text>
                                    <text x="343.18" y="790" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        Bb3
                                    </text>
                                    <text x="246.76" y="584" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D4
                                    </text>
                                    <text x="485.56" y="390" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        D5
                                    </text>
                                    <text x="304.25" y="391" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        F4
                                    </text>
                                    <text x="817.38" y="380" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        G4
                                    </text>
                                    <text x="878.58" y="583" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E4
                                    </text>
                                    <text x="656.88" y="393" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        E5
                                    </text>
                                    <text x="585.4" y="880" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A3
                                    </text>
                                    <text x="456.8" y="257" textAnchor="middle" className="fill-white text-sm font-bold pointer-events-none select-none">
                                        A4
                                    </text>
                                </>
                            ) : (
                                <>
                                    {/* Default fallback for other products */}
                                </>
                            )}
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}