// import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { validEmail } from "./utils/validEmail";
import { ticketNumber } from "./utils/ticketNumber";

type ErorrMesages = {
  maxFile: boolean | undefined;
  email: boolean | undefined;
  name: boolean | undefined;
  github: boolean | undefined;
};

export type FormInput = {
  name: string | null;
  email: string | null;
  github: string | null;
};

export default function App() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [error, setError] = useState<ErorrMesages>({
    maxFile: undefined,
    email: undefined,
    name: undefined,
    github: undefined,
  });
  const [form, setForm] = useState<FormInput>({
    name: null,
    email: null,
    github: null,
  });
  const dragCounter = useRef(0);
  const [stage2, setStage2] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseUrl = import.meta.env.BASE_URL;

  const date = new Date();

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleFile = (getfile: File) => {
    if (!["image/jpeg", "image/png"].includes(getfile.type)) {
      alert("Only JPG and PNG are allowed.");
      return;
    }

    if (getfile.size > 500 * 1024) {
      setError((prev) => ({ ...prev, maxFile: true }));
      setAvatar(null);
      return;
    }
    setError((prev) => ({ ...prev, maxFile: false }));

    if (avatar) {
      URL.revokeObjectURL(avatar);
    }

    const url = URL.createObjectURL(getfile);
    setAvatar(url);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    dragCounter.current = 0;
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      handleFile(selected);
    }
  };

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    const valid = validEmail(e.target.value);
    if (!valid) {
      setError((prev) => ({ ...prev, email: true }));
      return;
    }
    setError((prev) => ({ ...prev, email: false }));
    setForm((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  }
  function handleName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    if (!name.trim()) {
      setError((prev) => ({ ...prev, name: true }));
      return;
    }
    setError((prev) => ({ ...prev, name: false }));
    setForm((prev) => ({
      ...prev,
      name,
    }));
  }
  function githubName(e: ChangeEvent<HTMLInputElement>) {
    const github = e.target.value;
    if (!github.trim()) {
      setError((prev) => ({ ...prev, github: true }));
      return;
    }
    setError((prev) => ({ ...prev, github: false }));
    setForm((prev) => ({
      ...prev,
      github,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (error.email === true || error.name === true || error.github === true) {
      return;
    }
    if (!avatar) return;
    setTicket(ticketNumber());
    setStage2(true);
    console.log(form);
  }
  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);
  return (
    <div>
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
        {stage2 && avatar ? (
          <div className="flex mt-6 relative sm:w-auto w-full">
            <img
              src={`${baseUrl}/images/pattern-ticket.svg`}
              alt="invite ticket"
            />
            <span
              className="absolute top-5/11 -right-1 text-preset-3
              text-gray-400
              rotate-90
              "
            >
              {ticket}
            </span>

            <div className="flex sm:bottom-6 ssm:left-6 bottom-2 left-3 absolute gap-6">
              <img
                src={avatar}
                alt="Avatar"
                className=" z-10 ssm:h-22 ssm:w-22 h-12 w-12 rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center  gap-2">
                <p className="text-preset-3 text-white">{form.name}</p>
                <p className="flex gap-2 items-center text-preset-5 text-gray-400">
                  <img
                    src={`${baseUrl}/images/icon-github.svg`}
                    alt="Github icon"
                  />
                  {form.github}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 absolute ssm:top-6 ssm:left-6 top-2 left-2 z-10">
              <img
                className=""
                src={`${baseUrl}/images/logo-full.svg`}
                alt="logo"
              />
              <span className="text-preset-6 text-gray-400">
                {formatted}&nbsp; / &nbsp;Austin, TX
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="ticket-form text-white flex flex-col gap-3"
          >
            {/* Avatar Upload */}
            <div className="form-group">
              <label htmlFor="avatar" className="text-preset-5 text-white ">
                Upload Avatar
              </label>

              <div
                className={`upload-area cursor-pointer
            flex flex-col justify-center items-center gap-4 my-3
            bg-transparent  sm:w-115   w-full border-2 border-dashed border-gray-500 rounded-xl 
            min-h-36 
            
                ${
                  isDragging
                    ? "border-orange-400 bg-neutral-700"
                    : "border-gray-500"
                }
                                
                `}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  id="avatar"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleChange}
                />

                <label
                  htmlFor="avatar"
                  className={`cursor-pointer flex h-full w-full flex-col items-center justify-center gap-5 p-4 
                `}
                >
                  {avatar ? (
                    <>
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="border-2 border-gray-400 h-18 w-18 rounded-xl object-cover"
                      />

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="text-preset-6-mobile rounded px-2
                      py-1
                      text-neutral-400
                      cursor-pointer
                      bg-neutral-800"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (avatar) {
                              URL.revokeObjectURL(avatar);
                            }

                            setAvatar(null);
                            if (inputRef.current) {
                              inputRef.current.value = "";
                            }
                          }}
                        >
                          Remove Image
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            inputRef.current?.click();
                          }}
                          className="text-preset-6-mobile  text-neutral-400 rounded px-2 py-1 cursor-pointer bg-neutral-800"
                        >
                          Change Image
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={`${baseUrl}/images/icon-upload.svg`}
                        alt="upload file"
                        className="rounded border-2 border-gray-600 p-1"
                      />

                      <span className="text-preset-6 text-gray-300">
                        Drag and drop or click to upload
                      </span>
                    </>
                  )}
                </label>
              </div>
              <small
                className={`upload-info text-preset-7 ${error.maxFile ? "text-red-400" : " text-gray-400"} flex gap-2 `}
              >
                <img
                  src={`${baseUrl}/images/icon-info.svg`}
                  alt="info"
                  className={`info ${error.maxFile ? "not-valid" : ""}`}
                />
                {error.maxFile
                  ? "File too large .Please upload photo under 500KB."
                  : "Upload your photo (JPG or PNG, max size: 500KB)."}
              </small>
            </div>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="text-preset-5 block ">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                onChange={(e) => handleName(e)}
                required
                className={`hover:bg-gray-700  my-3 border-2 border-gray-700 rounded-xl text-preset-6 p-3 w-full ${error.name ? "border border-red-400 focus:outline-none" : ""}
                `}
              />
              <small
                className={`text-preset-7 flex gap-2 text-red-400 items-center ${error.name === true ? "visible" : "hidden"}`}
              >
                <img
                  src={`${baseUrl}/images/icon-info.svg`}
                  alt="info"
                  className="info not-valid"
                />
                Please fill name
              </small>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="text-preset-5 ">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className={`hover:bg-gray-700  mt-3 border-2 border-gray-700 rounded-xl text-preset-6 p-3 w-full ${error.email ? "border border-red-400 focus:outline-none" : ""}
                `}
                onChange={handleEmail}
                placeholder="example@email.com"
                required
              />
            </div>

            <small
              className={`text-preset-7 flex gap-2 text-red-400 items-center ${error.email ? "" : "hidden"}`}
            >
              <img
                src={`${baseUrl}/images/icon-info.svg`}
                alt="info"
                className="info not-valid"
              />
              Please enter valid email
            </small>
            {/* GitHub Username */}
            <div className="form-group">
              <label htmlFor="github" className="text-preset-5 ">
                GitHub Username
              </label>

              <input
                type="text"
                id="github"
                name="github"
                placeholder="@yourusername"
                autoComplete="username"
                onChange={(e) => githubName(e)}
                required
                className={`my-3 border-2  border-gray-700 rounded-xl text-preset-6 p-3 w-full
                ${error.github ? "border border-red-400 focus:outline-none" : ""}
                `}
              />
              <small
                className={`text-preset-7 flex gap-2 items-center text-red-400  ${error.github ? "" : "hidden"}`}
              >
                <img
                  src={`${baseUrl}/images/icon-info.svg`}
                  alt="info"
                  className="info not-valid"
                />
                Please enter user
              </small>
            </div>

            <button
              type="submit"
              className=" bg-orange-500  cursor-pointer text-neutral-900 rounded-xl text-preset-5-extrabold p-4 w-full"
            >
              Generate My Ticket
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
