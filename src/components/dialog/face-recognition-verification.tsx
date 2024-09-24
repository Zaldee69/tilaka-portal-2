'use client';

import useCameraPermission, {
  TPermissionState
} from '@/hooks/use-camera-permission';
import Image from 'next/image';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Webcam from 'react-webcam';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '../ui/button';
import { MailOutlineIcon } from '../../../public/icons/icons';
import { VideoOff } from 'lucide-react';

interface Constraint {
  width: number;
  height: number;
  facingMode: string;
}

interface Props {
  callbackCaptureProcessor: (base64Img: string | null | undefined) => void;
  title: string;
  subtitle: string;
  open: boolean;
  showOTPButton?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOTPDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FRVerification = ({
  callbackCaptureProcessor,
  setOpen,
  setOpenOTPDialog,
  open,
  title,
  subtitle,
  showOTPButton = true
}: Props) => {
  const constraint: Constraint = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  };

  const cameraPermission: TPermissionState = useCameraPermission();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserMediaError, setIsUserMediaError] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);

  const s = useTranslations('Settings');
  const d = useTranslations('SigningDialog');
  const c = useTranslations('cannotAccessCameraDialog');

  const onPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const shouldChangeRingWidth: boolean = useMediaQuery('(max-width: 768px)');

  const capture = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    callbackCaptureProcessor(imageSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cameraPermission === 'denied') setIsUserMediaError(true);
  }, [cameraPermission]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {isUserMediaError ? (
          <AlertDialogContent className="py-6 max-w-sm gap-7">
            <AlertDialogHeader className="text-center gap-3">
              <AlertDialogTitle>{c('title')}</AlertDialogTitle>
              <AlertDialogDescription className="whitespace-pre-line">
                {c.rich('subtitle', {
                  icon: () => <VideoOff className="inline" />
                })}
                <Webcam
                  className="rounded-[30px] sm:w-full object-cover w-0 h-0"
                  ref={webcamRef}
                  audio={false}
                  height={440}
                  screenshotFormat="image/jpeg"
                  width={1280}
                  screenshotQuality={1}
                  minScreenshotWidth={1280}
                  mirrored={false}
                  minScreenshotHeight={960}
                  videoConstraints={constraint}
                  onLoadedMetadata={onPlay}
                  onUserMediaError={() => setIsUserMediaError(true)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="!justify-center !items-center">
              <AlertDialogCancel
                onClick={() => window.location.reload()}
                className="!px-10 bg-primary text-white"
              >
                {c('submit')}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent className="max-w-md">
            <div className="justify-center flex mb-3 ">
              <Image
                src="/images/fr.svg"
                height={69}
                width={77}
                alt="Tilaka Logo"
                quality={100}
                priority
              />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {subtitle}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="relative">
              <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <Image
                  src="/images/camera-frame.svg"
                  className="md:w-56 w-44"
                  height={220}
                  width={220}
                  alt="Tilaka Logo"
                  quality={100}
                  priority
                />
              </div>
              <div
                id="countdown-timer-fr"
                className="absolute text-white bg-black/10 rounded-full top-5 right-5 md:right-10 flex justify-center"
              >
                <CountdownCircleTimer
                  onComplete={() => {
                    capture();
                    return {
                      shouldRepeat: false
                    };
                  }}
                  isPlaying={isPlaying}
                  size={shouldChangeRingWidth ? 35 : 45}
                  strokeWidth={2}
                  duration={5}
                  colors="#fff"
                >
                  {({ remainingTime }) => remainingTime + 's'}
                </CountdownCircleTimer>
              </div>
              <Webcam
                className="rounded-[30px] sm:w-full h-80 w-full md:h-96 md:w-96 object-cover"
                ref={webcamRef}
                audio={false}
                height={440}
                screenshotFormat="image/jpeg"
                width={1280}
                screenshotQuality={1}
                minScreenshotWidth={1280}
                mirrored={false}
                minScreenshotHeight={960}
                videoConstraints={constraint}
                onLoadedMetadata={onPlay}
                onUserMediaError={() => setIsUserMediaError(true)}
              />
            </div>
            <div className="flex flex-col ">
              <AlertDialogFooter className="!justify-center">
                <AlertDialogCancel className="mt-2 h-fit text-base">
                  {s('dialog.authMethod.cancelButton')}
                </AlertDialogCancel>
              </AlertDialogFooter>

              {showOTPButton ? (
                <Button
                  onClick={() => {
                    setOpen(false);
                    setOpenOTPDialog && setOpenOTPDialog(true);
                  }}
                  variant="ghost"
                  className="!w-fit px-0 mx-auto hover:text-gray-2 text-gray-2 font-semibold my-1"
                >
                  <MailOutlineIcon
                    pathClassName="fill-[#494949]"
                    svgClassName="mr-2"
                  />
                  {d('frDialog.useOTP')}
                </Button>
              ) : null}
            </div>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
};

export default FRVerification;
