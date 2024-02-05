"use client"
import { useState } from "react";
import useDownloader from "react-use-downloader";


export default function Home() {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
  const [url, setUrl] = useState("");

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const onclickHandler = () => {
    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([/a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (regex.test(url)) {
      console.log(url);

      const fileExtension = url.split('.').pop().toLowerCase();
      const pathname = new URL(url).pathname;
      const filename = pathname.split('/').pop();

      const filePath = `${filename}.${fileExtension}`;
      download(url, filePath);
    } else {
      alert("Invalid URL");
    }
  };


  return (
    <div className="container mx-auto mt-10 p-8 bg-white shadow-md max-w-lg rounded-md">
      <h3 className="text-2xl font-semibold mb-6 text-blue-700 text-center">File Downloader</h3>

      <div className="mb-6">
        <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter URL</label>
        <input type="text" id="url" value={url} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com/image.jpg" required />
      </div>

      <button type="button" onClick={onclickHandler} className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 text-center me-2 mb-2">Download</button>

      <p className="mt-4 text-gray-600">Download is {isInProgress ? "in progress" : "stopped"}</p>

      <div className="mt-6">
        <button type="button" disabled={isInProgress ? false : true} onClick={() => cancel()} className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Cancel download</button>
      </div>

      <p className="mt-4 text-gray-600">Download size: {size} bytes</p>

      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Downloading progress:</label>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: percentage }}></div>
      </div>

      <p className="mt-2 text-gray-600">Elapsed time: {elapsed} seconds</p>

      {error && (<p className="text-red-600 mt-4">Possible error: {error.errorMessage}</p>)}
    </div>
  );
}
