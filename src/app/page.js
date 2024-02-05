"use client"
import useDownloader from "react-use-downloader";


export default function Home() {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();

  const fileUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
  const filename = "File.jpg";

  const onclickHandler = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    fetch("/api/download", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: e.target.email.value })
    }).then(res => res.json()).then(data => console.log(data));
  };


  return (
    // <div className="container">
    //   <h3 className="">File Downloader</h3>

    //   <div className="mb-5">
    //     <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter URL</label>
    //     <input type="text" id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" required />
    //   </div>

    //   <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>

    //   <p>Download is in {isInProgress ?
    //     "in progress" : "stopped"}</p>

    //   <button onClick={() => download(fileUrl, filename)}>
    //     Click to download the file
    //   </button>
    //   <button onClick={() => cancel()}>
    //     Cancel the download
    //   </button>
    //   <p>Download size in bytes {size}</p>

    //   <label htmlFor="file">Downloading progress:</label>
    //   <progress id="file" value={percentage} max="100" />
    //   <p>Elapsed time in seconds {elapsed}</p>
    //   {error && <p>possible error {JSON.stringify(error)}</p>}
    // </div>

    // New html
    <div className="container mx-auto mt-10 p-8 bg-white shadow-md max-w-lg rounded-md">
      <h3 className="text-2xl font-semibold mb-6 text-blue-700">File Downloader</h3>

      <div className="mb-6">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Enter URL</label>
        <input
          type="text"
          id="url"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <button
        type="button"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Download
      </button>

      <p className="mt-4 text-gray-600">
        Download is {isInProgress ? "in progress" : "stopped"}
      </p>

      <div className="mt-6">
        <button
          onClick={() => download(fileUrl, filename)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-2 px-4 mr-2 focus:outline-none"
        >
          Click to download
        </button>

        <button
          onClick={() => cancel()}
          className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 px-4 focus:outline-none"
        >
          Cancel download
        </button>
      </div>

      <p className="mt-4 text-gray-600">Download size: {size} bytes</p>

      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mt-4">
        Downloading progress:
      </label>
      <progress
        id="file"
        value={percentage}
        max="100"
        className="w-full h-5 mt-2 bg-gray-300 rounded-md"
      />

      <p className="mt-2 text-gray-600">Elapsed time: {elapsed} seconds</p>

      {error && (
        <p className="text-red-600 mt-4">
          Possible error: {JSON.stringify(error)}
        </p>
      )}
    </div>
  );
}
