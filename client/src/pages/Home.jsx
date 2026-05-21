import { useState }  from 'react'
import axios from 'axios'

function Home(){
    const {url, setUrl} = useState('');
    const {shortUrl, setShortUrl} = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:3000/shorten',
                {url}
            );
            setShortUrl(response.data.shortUrl);
        }catch(error){
            console.log(error);
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-lg">

        <h1 className="text-4xl font-bold mb-6">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter URL"
            className="w-full border p-3 rounded mb-4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            className="bg-black text-white px-6 py-3 rounded"
          >
            Shorten
          </button>

        </form>

        {shortUrl && (
          <div className="mt-6">
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-500"
            >
              {shortUrl}
            </a>
          </div>
        )}

      </div>

    </div>
    );
}

export default Home;