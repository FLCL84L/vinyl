function SongCard({title, artist}) {
    return(
        <div>
            <img src="/vinyl.png" alt="" />

            <h2>{title}</h2>
            <p>{artist}</p>
        </div>
    )
}

export default SongCard