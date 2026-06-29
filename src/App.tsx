import Header from "./components/Header";
import Footer from "./components/Footer";
import TicketStage from "./components/TicketStage";
import FormStage from "./components/FormStage";
import { useState } from "react";

export type FormInput = {
  name: string | null;
  email: string | null;
  github: string | null;
};

export default function App() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  const [form, setForm] = useState<FormInput>({
    name: null,
    email: null,
    github: null,
  });
  const [stage2, setStage2] = useState<boolean | null>(null);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <>
      <img
        className="fixed right-0 top-3 "
        src={`${baseUrl}/images/pattern-squiggly-line-top.svg`}
        alt=""
      />
      <img
        className="fixed -left-4 -bottom-16 lg:hidden"
        src={`${baseUrl}/images/pattern-squiggly-line-bottom-mobile-tablet.svg`}
        alt=""
      />

      {/* Desktop */}
      <img
        className="fixed bottom-0 left-0 hidden lg:block"
        src={`${baseUrl}/images/pattern-squiggly-line-bottom-desktop.svg`}
        alt=""
      />
      <Header form={form} stage2={stage2} />
      <main className="flex justify-center items-center flex-col mb-6 px-3 relative">
        {stage2 ? (
          <TicketStage ticket={ticket} form={form} avatar={avatar} />
        ) : (
          <FormStage
            stage2={stage2}
            setStage2={setStage2}
            form={form}
            setTicket={setTicket}
            setForm={setForm}
            avatar={avatar}
            setAvatar={setAvatar}
            ticket={ticket}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
