import ExternalLoginButton from "@/components/domains/auth/external-login-button";
import Link from "next/link";
import LoginForm from "@/components/domains/auth/login-form";

export const metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <main className="max-w-2xl mx-auto">
      <section className="flex p-8 my-10">
        <h1 className="text-4xl font-bold leading-snug">
          <b className="text-violet-600">나</b>도
          <br />
          <b className="text-violet-600">하</b>루
          <br />
          로그인
        </h1>
      </section>
      <LoginForm />
      <div className="px-8 pb-8 flex justify-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          아직 나도하루 계정이 없나요?{" "}
          <Link href="/sign-up" className="underline text-violet-600">
            회원가입 하기
          </Link>
        </p>
      </div>
      <div className="flex gap-8 pt-8 justify-center">
        <ExternalLoginButton icon="apple" />
        <ExternalLoginButton icon="kakao" />
        <ExternalLoginButton icon="github" />
      </div>
    </main>
  );
}
