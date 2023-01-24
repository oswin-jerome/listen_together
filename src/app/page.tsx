"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import Pusher from "pusher-js";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  var pusher: any;
  Pusher.logToConsole = true;

  pusher = new Pusher("c2af354409b506f59ad3", {
    cluster: "mt1",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data: any) {
    // alert(JSON.stringify(data.message));
    setVideo(data.message);
  });

  channel.bind("my-pause", function (data: any) {
    target.pauseVideo();
  });

  // useEffect(() => {}, []);
  const [vid, setVid] = useState("2g811Eo7K8U");
  const [video, setVideo] = useState("2g811Eo7K8U");
  var target: any;
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    target = event.target;
  };

  const youtube_parser = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  return (
    <main className={styles.main}>
      <input type="text" value={vid} onChange={(e) => setVid(e.target.value)} />
      <button
        onClick={() => {
          fetch("/api/hello?id=" + youtube_parser(vid));
        }}
      >
        Pause
      </button>
      <YouTube
        videoId={video}
        onPause={() => {}}
        opts={{
          playerVars: { autoplay: 1 },
        }}
        onReady={onPlayerReady}
      />
    </main>
  );
}
