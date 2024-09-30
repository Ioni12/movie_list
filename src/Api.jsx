import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

const API_KEY = "40d7a0e2";

export default function Api()
{
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ movies, setMovies ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const searchmovies = async () => {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
            if(!res.ok)
            {
                throw new Error("failed to fetch movies");
            }
            const data = await res.json();
            if(data.Response === "False"){
                throw new Error(data.Error);
            }   
            setMovies(data.Search);
            console.log(data);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };


    return(
        <>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-neutral-700 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-stone-200">Movie list app</h1>
                <div className="flex mb-4">
                    <Input type="text" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} placeholder="enter movie title" className="flex-grow mr-2 text-l font-bold"/>
                    <Button onClick={searchmovies} disabled={loading}>
                        <Search size={20}/>
                    </Button>
                </div>
                {loading && <p className="text-l font-bold text-stone-200">loading ..</p>}
                {error && <p className="text-l font-bold text-red-600">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies.map((movie) => (
                        <Card key={movie.imdbID}>
                            <CardHeader>
                                <CardTitle>{movie.Title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2"/>
                                <p>Year: {movie.Year}</p>
                                <p>Type: {movie.Type}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}