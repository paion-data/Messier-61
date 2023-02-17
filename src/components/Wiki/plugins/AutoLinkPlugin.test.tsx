// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

  const urlify = (text: any) => {
      const urlRegex =   /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
      return text.replace(urlRegex, (url: any) => {
        return `<a href="${url}>${url}</a>`;
      })
    }
    const text = 'Find me at http://www.example.com and also at http://stackoverflow.com';
    const html = urlify(text);
    console.log(html)
    
