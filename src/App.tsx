// import React from "react";

import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (getfile: File) => {
    if (!["image/jpeg", "image/png"].includes(getfile.type)) {
      alert("Only JPG and PNG are allowed.");
      return;
    }

    if (getfile.size > 500 * 1024) {
      alert("Max file size is 500KB.");
      return;
    }

    setFile(getfile);
    const url = URL.createObjectURL(getfile);
    setAvatar(url);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      handleFile(selected);
    }
  };

  useEffect(() => {
    console.log(file, 0);
  }, [file]);
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      <Header />
      <main className="flex justify-center items-center flex-col mb-6 px-3">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-20 w-20 rounded-xl object-cover"
          />
        ) : (
          <img src={`${baseUrl}/images/icon-upload.svg`} alt="" />
        )}
        <form className="ticket-form text-white flex flex-col gap-6">
          {/* Avatar Upload */}
          <div className="form-group">
            <label htmlFor="avatar" className="text-preset-5 text-white ">
              Upload Avatar
            </label>

            <div
              className={`upload-area
            flex flex-col justify-center items-center gap-4 my-3
            bg-transparent hover:bg-neutral-800 sm:w-115   w-full border-2 border-dashed border-gray-500 rounded-xl
            
                ${
                  isDragging
                    ? "border-orange-400 bg-neutral-700"
                    : "border-gray-500 hover:bg-neutral-800"
                }`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                id="avatar"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleChange}
              />

              <label
                htmlFor="avatar"
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4"
              >
                <img
                  src={`${baseUrl}/images/icon-upload.svg`}
                  alt=""
                  className="rounded border-2 border-gray-600 p-1"
                />

                <span className="text-preset-6 text-gray-300">
                  Drag and drop or click to upload
                </span>
              </label>
            </div>
            <small className="upload-info text-preset-7 text-gray-400 flex gap-3 ">
              <img src={`${baseUrl}/images/icon-info.svg`} alt="" />
              Upload your photo (JPG or PNG, max size: 500KB).
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
              required
              className="mt-3 border-2 border-gray-700 rounded-xl text-preset-6 p-3 w-full"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="text-preset-5 ">
              Email Address
            </label>

            <input
              type="text"
              id="text"
              name="email"
              placeholder="example@email.com"
              required
              className="mt-3 border-2 border-gray-700 rounded-xl text-preset-6 p-3 w-full"
            />
          </div>

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
              required
              className="mt-3 border-2  border-gray-700 rounded-xl text-preset-6 p-3 w-full"
            />
          </div>

          <button
            type="submit"
            className=" bg-orange-500  cursor-pointer text-neutral-900 rounded-xl text-preset-5-extrabold p-4 w-full"
          >
            Generate My Ticket
          </button>
        </form>
      </main>
    </>
  );
}
