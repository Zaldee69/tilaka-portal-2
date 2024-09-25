import React, { Fragment } from 'react';
import Navbar from './navbar';
import { Button } from '@/components/ui/button';
import { useWizard } from 'react-use-wizard';

const Step4 = () => {
  const { nextStep, previousStep } = useWizard();
  return (
    <Fragment>
      <Navbar />
      <div className="custom-shadow p-5 h-20 absolute bottom-0 left-0 right-0 bg-white flex justify-end gap-4">
        <Button
          variant="secondary"
          className="!font-bold custom-shadow bg-white"
          onClick={() => previousStep()}
        >
          Kembali
        </Button>
        <Button
          className="!font-bold sign-button-shadow"
          onClick={() => nextStep()}
        >
          Lanjut
        </Button>
      </div>
    </Fragment>
  );
};

export default Step4;
