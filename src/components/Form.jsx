

export default function Form({ mediaDownload}) {

    return (
        <form onSubmit={mediaDownload} className="border border-red-500 w-full md:w-6/12 mx-auto flex justify-between m-4 rounded-md">
            <input type="url" name="mediaUrl" placeholder="Paste the link here" className="p-2 rounded-l-md focus:outline-none w-full" />
            <button className="bg-blue-500 text-white p-2 bg-gradient-to-r from-rose-700 to-pink-600">Download</button>
        </form>
    )
}
