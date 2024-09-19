'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { Button, buttonVariants } from '@/components/ui/button';
import { useContext, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TnCContext } from './TncContextProvider';
import FRDialog from '@/components/dialog/FRVerification';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

const TnCDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);

  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [acceptCondition, setAcceptCondition] = useState<boolean>(false);

  const [openFrDialog, setOpenFrDialog] = useState<boolean>(false);
  const [openCertInformation, setOpenCertInformation] =
    useState<boolean>(false);

  const { stateSetter, state } = useContext(TnCContext);

  const t = useTranslations('Settings.dialog.fr');

  const i = useTranslations('issuanceOnProcessDialog');

  const x = useTranslations('TnC');

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current!;
    console.log({ scrollTop, scrollHeight, clientHeight });
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolledToBottom(true);
    }
  };

  return (
    <>
      <Dialog
        open={state.isOpen}
        onOpenChange={(open) => stateSetter({ isOpen: open })}
      >
        <DialogContent className="px-2 pb-3 md:pb-6 md:px-6">
          <DialogHeader>
            <DialogTitle className="uppercase">
              {x('termsAndConditions')} 
            </DialogTitle>
          </DialogHeader>
          <div>
            <div className="text-center bg-[#0AB7E9] rounded-md text-white py-2 mb-3">
              <p className="text-sm md:text-base px-3">
                {x('instructions')}
              </p>
            </div>
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="md:max-h-[400px] max-h-[280px] overflow-y-scroll text-sm px-2 pb-3"
            >
              <div>
                <p className="mt-3 mb-0 text-lg leading-6 font-bold">
                {x('welcomeMessage')}
                </p>
                <p className="mt-3 mb-0 leading-6">
                  {x('companyStatement')}
                  <a
                    href="https://corporate.tilaka.id/ca-corporate-portal/login.xhtml"
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    https://corporate.tilaka.id/ca-corporate-portal/login.xhtml
                  </a>{' '}
                  {x('thirdPartyInfo')}
                </p>
                <p className="mt-3 mb-1 leading-6">
                  {x('effectiveDate')}
                </p>
                <p className="mt-3 mb-0 leading-6">
                  {x('electronicDocumentAcknowledgment')}
                </p>
                <p className="mt-3 mb-0 leading-6 text-lg font-bold">
                  {x('definition')}
                </p>
                <ol className="m-0 pl-0 list-decimal">
                  <li className="ml-4 indent-0 pl-2">
                    {x('accountDefinition')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('personalDataDefinition')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('electronicDocumentDefinition')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('calendarDayDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('electronicContractDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('subscriberDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('applicantDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('customerDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('psreDefinition')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('businessMitraDefiniton')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('tilakaRepositoryDefinition')}
                    <a
                      href="https://repository.tilaka.id/"
                      className="text-blue-600 underline"
                    >
                      https://repository.tilaka.id/
                    </a>
                    .
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('certificateDefinition')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('subscriberCertificateDefiniton')}
                  </li>
                </ol>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">
                  {x('termsForUsers')}
                </p>
                <ol className="m-0 pl-0 list-decimal">
                  <li className="ml-4 indent-0 pl-2">
                    {x('userAgreement')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('accountUsage')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('personalDataSubmission')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('verificationClause')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('dataAccuracyGuarantee')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('certificateContentAgreement')}
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('certificateContentReview')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('noResponseClause')}
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('keyReplacementClause')}
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('keyChangeImpact')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('keyChangeGeneration')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('newCertificateValidity')}
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('prohibitedUsage')}
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('illegalUse')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('damageOrTampering')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('violationOfRights')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('copyModify')}
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('serviceSuspension')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('informationDisclosure')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('publicDocumentsCompliance')}
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        <em>{x('cps')}</em> (“CPS”);
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('privacyPolicy')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('subscriberAgreement')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('warrantyPolicy')}
                        <span className="text-gray-600">.</span>
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('partnerAppUsage')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('appUsageAgreement')}
                    <ol className="m-0 pl-0 list-[lower-alpha]">
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('documentStorage')}
                      </li>
                      <li className="mt-0 ml-10 indent-0 pl-2">
                        {x('nikStorage')}
                      </li>
                    </ol>
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('liabilityWaiver')}
                  </li>
                  <li className="mt-0 ml-4 indent-0 pl-2">
                    {x('liabilityAndIndemnity')}
                  </li>
                </ol>
                <p className="mt-0 indent-0">&nbsp;</p>
                <p className="leading-6 text-lg font-bold">
                  {x('confidentialityAndSecurity')}
                </p>
                <p>
                  {x('disclosureForLegalCompliance')}
                </p>
                <br />
                <p className="leading-6 text-lg font-bold">
                  {x('IntellectualPropertyRights')}
                </p>
                <p>
                  {x('intellectualProperty')}
                </p>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">{x('contact')}</p>
                <p>
                  {x('contactInformation')}
                  <a
                    href="mailto:info@tilaka.id"
                    className="text-blue-600 underline"
                  >
                    info@tilaka.id
                  </a>{' '}
                  {x('nextContactInformation')}
                </p>
                <p>&nbsp;</p>
                <p className="leading-6 text-lg font-bold">{x("disputeResolution")}</p>
                <p>
                  {x('disputeResolutionDetails')}
                </p>
                <p>&nbsp;</p>
                <p>
                  CP/CPS —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/CP_CPS.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/CP_CPS.pdf
                  </a>
                </p>
                <p>
                  Kebijakan Jaminan —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/kebijakan-jaminan.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/kebijakan-jaminan.pdf
                  </a>
                </p>
                <p>
                  Kebijakan Privasi —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/kebijakan-privasi.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/kebijakan-privasi.pdf
                  </a>
                </p>
                <p>
                  Perjanjian Pemilik Sertifikat —&gt;&nbsp;
                  <a
                    href="https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf"
                    target="_blank"
                    className="text-blue-600"
                  >
                    https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf
                  </a>
                </p>
              </div>
            </div>
            <div className="pt-5 px-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  onCheckedChange={(checked: boolean) => setAcceptTerm(checked)}
                  disabled={!isScrolledToBottom}
                  id="terms"
                  className="!rounded-[2px]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {x('dataAccuracy')}
                </label>
              </div>
              <div className="flex items-start mt-3 space-x-2">
                <Checkbox
                  onCheckedChange={(checked: boolean) =>
                    setAcceptCondition(checked)
                  }
                  disabled={!isScrolledToBottom}
                  id="condition"
                  className="!rounded-[2px]"
                />
                <label
                  htmlFor="condition"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div>
                    {x('agreed')}
                    <a
                      href="https://repository.tilaka.id/CP_CPS.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      CP/CPS
                    </a>
                    ,
                    <a
                      href="https://repository.tilaka.id/kebijakan-jaminan.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Kebijakan Jaminan
                    </a>
                    ,
                    <a
                      href="https://repository.tilaka.id/kebijakan-privasi.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Kebijakan Privasi
                    </a>
                    , {x('and')}
                    <a
                      href="https://repository.tilaka.id/perjanjian-pemilik-sertifikat.pdf"
                      target="_blank"
                      className="text-primary"
                    >
                      {' '}
                      Perjanjian Pemilik Sertifikat
                    </a>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="md:grid flex flex-col-reverse items-center md:grid-cols-2 gap-2 justify-center ">
            <Button
              onClick={() => stateSetter({ isOpen: false })}
              variant="ghost"
              className="border border-primary text-primary !px-10 w-fit md:w-auto font-semibold"
            >
              {x('back')}
            </Button>
            {state.confirmationType === 'fr' ? (
              <Button
                disabled={!acceptCondition || !acceptTerm}
                onClick={() => {
                  setOpenFrDialog(true);
                  stateSetter({ isOpen: false });
                }}
                className="font-semibold !px-10 w-fit md:w-auto md:max-w-none max-w-[136px]"
              >
                {x('confirm')}
              </Button>
            ) : (
              <Link
                href="https://dev-api.tilaka.id/personal-webview/kyc/re-enroll?issue_id=issue-597ec4fd-daeb-481b-923b-4ca281f0c2dd&redirect_url=https://www.google.com"
                target="_blank"
                onClick={() => {
                  stateSetter({ isOpen: false });
                }}
              >
                <Button
                  disabled={!acceptCondition || !acceptTerm}
                  className="font-semibold !px-10 w-fit md:w-full md:max-w-none max-w-[136px]"
                >
                  {x('confirm')}
                </Button>
              </Link>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <FRDialog
        showOTPButton={false}
        open={openFrDialog}
        setOpen={setOpenFrDialog}
        callbackCaptureProcessor={() => {
          setOpenFrDialog(false);
          setOpenCertInformation(true);
        }}
        subtitle={t('subtitle')}
        title={i('frTitle')}
      />

      <AlertDialog
        open={openCertInformation}
        onOpenChange={setOpenCertInformation}
      >
        <AlertDialogContent className="max-w-sm py-4">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-black text-center pt-4">
              {i('content')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!items-center mt-3 !justify-center pb-4">
            <AlertDialogCancel className="bg-primary text-white !px-10 !w-fit">
              {i('submit')}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TnCDialog;
