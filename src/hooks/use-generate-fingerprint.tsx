import { useState, useEffect } from 'react';

export const useGenerateFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const getBrowserFingerprint = async () => {
      try {
        let navigatorInfo: {
          userAgent: string;
          language: string;
          platform: string;
          hardwareConcurrency?: number | undefined;
          deviceMemory?: string;
        } = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform
        };

        if (navigator.hardwareConcurrency) {
          navigatorInfo.hardwareConcurrency = navigator.hardwareConcurrency;
        }

        const deviceMemory = (navigator as any).deviceMemory;

        if (deviceMemory) {
          navigatorInfo.deviceMemory = deviceMemory;
        }

        let canvasFingerPrint = '';

        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(50, 50, 100, 100);
            ctx.fillStyle = '#069';
            ctx.fillText('Hello world', 60, 60);
            canvasFingerPrint = canvas.toDataURL();
          } else {
            console.log('Canvas context is null');
          }
        } catch (e) {
          console.error('Canvas fingerprinting failed:', e);
        }

        // Concatenate data for hashing
        const dataHash = [
          JSON.stringify(navigatorInfo),
          canvasFingerPrint
        ].join('::');

        // Convert the string to a Uint8Array for hashing
        const encoder = new TextEncoder();
        const dataAsUint8Array = encoder.encode(dataHash);

        // Perform SHA-256 hash
        const hashBuffer = await crypto.subtle.digest(
          'SHA-256',
          dataAsUint8Array
        );

        // Convert the hash to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        // Set the fingerprint state
        setFingerprint(hashHex);
      } catch (error) {
        console.error('Error generating browser fingerprint:', error);
      }
    };

    getBrowserFingerprint();
  }, []); // Empty dependency array ensures the effect runs only once

  return fingerprint;
};
