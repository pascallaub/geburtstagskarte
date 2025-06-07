import { useState, useEffect, useRef } from 'react';

const useMicBlow = (threshold = 70) => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const startMicrophone = async () => {
      try {
        // Mikrofon-Zugriff anfordern
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { 
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          } 
        });

        if (!mounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        // Audio Context erstellen
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const audioContext = audioContextRef.current;

        // Analyser Node erstellen
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;

        // Mikrofon mit Analyser verbinden
        microphoneRef.current = audioContext.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);

        setIsListening(true);
        
        // Audio-Analyse starten
        analyzeAudio();

      } catch (error) {
        console.error('Mikrofon-Zugriff fehlgeschlagen:', error);
      }
    };

    const analyzeAudio = () => {
      if (!analyserRef.current || !mounted) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current || !mounted) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Durchschnittliche Lautstärke berechnen
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        // Pusten erkennen (kurzzeitiger Lautstärke-Peak)
        const isCurrentlyBlowing = average > threshold;
        
        if (isCurrentlyBlowing && !isBlowing) {
          setIsBlowing(true);
          // Nach kurzer Zeit zurücksetzen
          setTimeout(() => {
            if (mounted) setIsBlowing(false);
          }, 300);
        }

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    };

    // Mikrofon starten
    startMicrophone();

    // Cleanup
    return () => {
      mounted = false;
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (microphoneRef.current && microphoneRef.current.mediaStream) {
        microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [threshold, isBlowing]);

  return { isBlowing, isListening };
};

export default useMicBlow;