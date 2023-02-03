"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[376],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(h,a(a({ref:t},p),{},{components:n})):r.createElement(h,a({ref:t},p))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9307:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_position:2,title:"CI/CD"},a=void 0,l={unversionedId:"development/ci-cd",id:"development/ci-cd",title:"CI/CD",description:"Testing",source:"@site/docs/development/ci-cd.md",sourceDirName:"development",slug:"/development/ci-cd",permalink:"/Messier-61/docs/development/ci-cd",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/development/ci-cd.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"CI/CD"},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/Messier-61/docs/development/getting-started"}},s={},c=[{value:"Testing",id:"testing",level:2},{value:"Release Process",id:"release-process",level:2},{value:"Messier-61",id:"messier-61",level:3},{value:"Messier-61 Documentation",id:"messier-61-documentation",level:3}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"testing"},"Testing"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Code style check"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"YAML lint"),(0,i.kt)("li",{parentName:"ul"},"Markdown lint"),(0,i.kt)("li",{parentName:"ul"},"Markdown link check"))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Build and test Messier-61")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Test Build Messier-61 Documentation"))),(0,i.kt)("h2",{id:"release-process"},"Release Process"),(0,i.kt)("h3",{id:"messier-61"},"Messier-61"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Fetch the tags from the adjusted remote"),(0,i.kt)("li",{parentName:"ol"},"Get the last tag on the working branch"),(0,i.kt)("li",{parentName:"ol"},"Build (",(0,i.kt)("inlineCode",{parentName:"li"},".github/upversion.py"),") and push the new tag as the new release version."),(0,i.kt)("li",{parentName:"ol"},"Bump Messier-61 version the new release version"),(0,i.kt)("li",{parentName:"ol"},"Push Messier-61 to ",(0,i.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@paiondata/messier-61"},"NPM registry"))),(0,i.kt)("h3",{id:"messier-61-documentation"},"Messier-61 Documentation"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docusaurus.io/docs/deployment#deploying-to-github-pages"},"GitHub Actions")," allow us to automate, customize, and execute our software development workflows right\nin our repository. This also applies to our documentations."),(0,i.kt)("p",null,"Messier-61 documentation source resides in the master branch under ",(0,i.kt)("inlineCode",{parentName:"p"},"docs/")," directory,  publishing source is configured\nfor the ",(0,i.kt)("inlineCode",{parentName:"p"},"gh-pages")," branch."),(0,i.kt)("p",null,"The CI/CD for documentation achieves 2 goals:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"When a new pull request is made to ",(0,i.kt)("inlineCode",{parentName:"li"},"master"),", there's an action that ensures the site builds successfully, without\nactually deploying. This job is called ",(0,i.kt)("inlineCode",{parentName:"li"},"test-doc-build"),"."),(0,i.kt)("li",{parentName:"ol"},"When a pull request is merged to the ",(0,i.kt)("inlineCode",{parentName:"li"},"master")," branch, it will be built and deployed to the ",(0,i.kt)("inlineCode",{parentName:"li"},"gh-pages")," branch. After\nthat, the new build output will be served on the GitHub Pages site. This job is ",(0,i.kt)("inlineCode",{parentName:"li"},"deploy-documentation")," called deploy.")))}u.isMDXComponent=!0}}]);