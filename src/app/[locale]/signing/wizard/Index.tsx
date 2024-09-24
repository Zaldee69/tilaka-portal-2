'use client';
import React, { useEffect } from 'react';
import { Wizard } from 'react-use-wizard';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import useSigningStore from '@/zustand/store';

const Index = () => {
  const { signers, addSigner } = useSigningStore();

  useEffect(() => {
    const signerNames = signers.map((signer) => signer.name);
    const newSignerName = 'johndoe21';

    console.log(signers.map((signer) => signer.name));

    const randomid = (Math.random() + 1).toString(36).substring(7);

    // Check if the new signer's name already exists
    if (!signerNames.includes(newSignerName)) {
      addSigner(randomid, newSignerName, 'signer');
    }
  }, []);

  return (
    <div>
      {' '}
      <Wizard
        startIndex={Number(localStorage.getItem('activeStep'))}
        onStepChange={(stepIndex) =>
          localStorage.setItem('activeStep', stepIndex.toString())
        }
      >
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
      </Wizard>
    </div>
  );
};

export default Index;
