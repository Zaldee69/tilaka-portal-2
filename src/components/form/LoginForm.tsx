'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSpring, animated } from '@react-spring/web';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { EyeIcon, EyeOffIcon, Loader2, X } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { MailIcon, UserIcon } from '../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import useSchema, { tilakaNameRegex } from '@/hooks/useSchema';
import { z } from 'zod';
import { Link, useRouter } from '@/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useGenerateFingerprint } from '@/hooks/use-generate-fingerprint';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const { LoginSchema } = useSchema();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { tilakaName: '', password: '' }
  });

  const t = useTranslations('Login');

  const fingerprint = useGenerateFingerprint();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const watchTilakaName = form.watch('tilakaName');

  const router = useRouter();

  const { height, marginTop } = useSpring<{
    height: number;
    marginTop: number;
  }>({
    from: { height: 0 },
    to: {
      height:
        tilakaNameRegex.test(watchTilakaName) ||
        emailRegex.test(watchTilakaName)
          ? 'auto'
          : 0,
      marginTop:
        tilakaNameRegex.test(watchTilakaName) ||
        emailRegex.test(watchTilakaName)
          ? 10
          : 0
    },
    config: {
      duration: 350
    }
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      tilaka_name: form.getValues('tilakaName'),
      password: form.getValues('password'),
      device_token: fingerprint,
      redirect: false
    });

    if (result?.ok) {
      toast.success('Login Berhasil');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      console.log(result);
      setIsLoading(false);
      toast.error('Kata Sandi atau Tilaka Name salah');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tilakaName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('form.tilakaname.placeholder')}
                  autoComplete="off"
                  {...field}
                  onChange={(e) => {
                    const { value } = e.target;
                    const noWhiteSpace = /\s/g;

                    form.setValue(
                      'tilakaName',
                      value.replace(noWhiteSpace, '')
                    );

                    if (emailRegex.test(value) || tilakaNameRegex.test(value)) {
                      form.clearErrors();
                    } else {
                      form.setError('tilakaName', {
                        type: 'manual',
                        message: t(
                          'form.message.error.tilakaNameOrEmailNotValid'
                        )
                      });
                    }

                    // Clear errors when the value is empty
                    if (value.length < 1) {
                      form.clearErrors();
                    }
                  }}
                  icon={renderMailIcon()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <animated.div style={{ overflow: 'hidden', height, marginTop }}>
              <FormItem>
                <FormControl>
                  <Input
                    icon={showPassword ? renderEyeIcon() : renderEyeOffIcon()}
                    placeholder="Password"
                    autoComplete="off"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </animated.div>
          )}
        />
        {renderLinks()}
        {renderButtons()}
      </form>
    </Form>
  );

  function renderMailIcon() {
    return !tilakaNameRegex.test(watchTilakaName) &&
      !emailRegex.test(watchTilakaName) ? (
      <MailIcon svgClassName="mt-3" />
    ) : (
      <X
        height={20}
        onClick={() => {
          form.reset();
        }}
        className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
      />
    );
  }

  function renderEyeIcon() {
    return (
      <EyeIcon
        height={20}
        className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
        onClick={toggleShowPassword}
      />
    );
  }

  function renderEyeOffIcon() {
    return (
      <EyeOffIcon
        height={20}
        className="cursor-pointer text-gray-1 mt-3.5 hover:text-primary hover:transition-colors"
        onClick={toggleShowPassword}
      />
    );
  }

  function renderLinks() {
    return (
      <div className="flex text-sm justify-between">
        {renderLink(t('forgotPasswordLink'))}
        {renderLink(t('forgotTilakanameLink'))}
      </div>
    );
  }

  function renderLink(text: string) {
    return (
      <Link href="#" className={getLinkClassName()}>
        <p className="flex items-center">{text} ?</p>
      </Link>
    );
  }

  function getLinkClassName() {
    return buttonVariants({
      className: 'text-gray-2 !p-0',
      variant: 'link'
    });
  }

  function renderButtons() {
    return (
      <>
        <Button disabled={isLoading} type="submit" className="w-full mb-4 mt-6">
          {isLoading ? <Loader2 className="animate-spin" /> : t('form.submit')}
        </Button>
        {renderClaimIdentityButton()}
      </>
    );
  }

  function renderClaimIdentityButton() {
    return (
      <Button
        disabled={isLoading}
        type="button"
        onClick={toggleShowPassword}
        variant="outline"
        className="w-full border-input text-gray-1 flex gap-2.5 justify-center group"
      >
        <UserIcon
          height={20}
          width={20}
          pathClassName="group-hover:fill-white transition-colors"
        />
        {t('claimIdentityBtn')}
      </Button>
    );
  }
};

export default LoginForm;
