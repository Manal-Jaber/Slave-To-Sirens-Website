import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navigation from "../Navigation/Navigation";
import SideNav from "../sideNav/SideNav";
import "./Discography.css"
function Discography() {

    //Erasing input when submitting
    const clickHandler = (e) => {
        e.preventDefault();
        setName('');
        setAlbum('');
        setUrl('');
    }


    //Getting Albums
    const [data1, setData1] = useState([]);
    useEffect(() => {
        
        axios.get('http://localhost:3001/admin/albums').then((response) => {
           setData1(response.data);
        })
    },[data1, setData1]);

    //Posting Albums
    const [name, setName] = useState('');

    const postAlbum= async (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:3001/admin/albums/add', {
                name: name
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    clickHandler(e);
                    setData1([
                        ...data1, {
                            name: name
                        }
                    ]);
                    alert("Added");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    //Deleting Albums
    const deleteAlbum= async (id) => {
        console.log(id);
        try{
            axios.delete(`http://localhost:3001/admin/albums/delete/${id}`)
            .then((data) => {
                if(data.status === 200){
                    console.log(data);
                    alert("Deleted");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    //Updating Albums
    const [newName , setNewName] = useState('');

    const updateAlbum = async(id) => {
        axios.put(`http://localhost:3001/admin/albums/update/${id}`, {
            id : id ,
            name : newName 
        }).then((response) => {
            alert("Updated");
        })
    }


    //Getting Tracks
    const [data2, setData2] = useState([]);
    useEffect(() => {
        
        axios.get('http://localhost:3001/admin/tracks').then((response) => {
           setData2(response.data);
        })
    },[data2, setData2]);

    //Posting Tracks
    const [album, setAlbum] = useState('');
    const [url, setUrl] = useState('');

    const postTrack= async (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:3001/admin/tracks/add', {
                album: album,
                url: url
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    setData2([
                        ...data2, {
                            album: album,
                            url: url
                        }
                    ]);
                    clickHandler(e);
                    alert("Added");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    //Deleting Tracks
    const deleteTrack= async (id) => {
        console.log(id);
        try{
            axios.delete(`http://localhost:3001/admin/tracks/delete/${id}`)
            .then((data) => {
                if(data.status === 200){
                    console.log(data);
                    alert("Deleted");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    //Updating Tracks
    const [newAlbum , setNewAlbum] = useState('');
    const [newUrl , setNewUrl] = useState('');

    const updateTrack = async(id) => {
        axios.put(`http://localhost:3001/admin/tracks/update/${id}`, {
            id : id ,
            album : newAlbum , 
            url : newUrl    
        }).then((response) => {
            alert("Updated");
        })
    }

    return (
    <div className="admin-discography container">
        <SideNav/>
        <Navigation/>
        <div className="Albums section">
            <h1>Albums</h1>
                <div className="title-bar">
                    <p>Album Name</p>
                </div>
            <form className = "add-form">
                <div className="textArea">
                <label htmlFor="name">
                    Add Album: 
                </label>
                    <textarea id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <button onClick={postAlbum}>Post</button>
            </form>
            <div>
            
            <ul>
            {data1.map(album => {
             return (<div>
                 <li className="body" key={album._id}>
                     <div>
                        <div className="body-list">
                            <p className="name">{album.name}</p>
                            <button onClick={()=>{deleteAlbum(album._id)}}>Delete</button>
                        </div>
                        <form className="body-modify">
                            <textarea name="album-title" onChange={(e)=>{setNewName(e.target.value)}}/>
                            <button onClick={() => {updateAlbum(album._id)}}>Update</button>
                        </form>
                    </div>
                </li>
             </div>
  )})}
            </ul>
            </div>
        </div>
        <div className="tracks section">
            <h1>Tracks</h1>
                <div className="title-bar">
                    <p>Album</p>
                    <p>Url</p>
                </div>
            <form className = "add-form">


            <select className="body"name="tack-album" id="tack-album" value={album} onChange={(e)=>{setAlbum(e.target.value)}}>
            <option key={0} value="" disabled></option>
            {data1.map(albums => 
                <option key={albums._id +1} value={albums.name}>
                    {albums.name}
                </option>
            )}</select>
                <label>
                    Add url link: 
                    <input type="url" name="track-url" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
                </label>
                <button onClick={postTrack}>Post</button>
            </form>
            <div>
            
            <ul>
            {data2.map(track => 
            (<li className="body" key={track._id}>
                <div>
                    <div className="body-list">
                        <p className="album">{track.album}</p>
                        <p className="url">{track.url}</p>
                        <button onClick={()=>{deleteTrack(track._id)}}>Delete</button>
                    </div>
                    <form className="body-modify">
                    <select className="body"name="tack-album" id="tracksss" onChange={(e)=>{setNewAlbum(e.target.value)}}>
                        <option key={0} value="" disabled></option>
                        {data1.map(albums => 
                            <option key={albums._id +1} value={albums.name}>{albums.name}</option>
                        )}</select>
                        <input type="url" name="track-url" onChange={(e)=>{setNewUrl(e.target.value)}}/>
                        <button onClick={() => {updateTrack(track._id)}}>Update</button>
                    </form>
                </div>
            </li>
            ))}
            </ul>
            </div>
        </div>
    </div>
    )
}

export default Discography
