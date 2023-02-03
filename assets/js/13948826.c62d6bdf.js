"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[976],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,h=d["".concat(c,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(h,i(i({ref:t},p),{},{components:n})):r.createElement(h,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},282:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:1,title:"Getting Started"},i=void 0,l={unversionedId:"development/getting-started",id:"development/getting-started",title:"Getting Started",description:"This project was bootstrapped with Create React App.",source:"@site/docs/development/getting-started.md",sourceDirName:"development",slug:"/development/getting-started",permalink:"/Messier-61/docs/development/getting-started",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/development/getting-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Getting Started"},sidebar:"tutorialSidebar",previous:{title:"Development",permalink:"/Messier-61/docs/category/development"},next:{title:"CI/CD",permalink:"/Messier-61/docs/development/ci-cd"}},c={},s=[{value:"Available Scripts",id:"available-scripts",level:2},{value:"<code>npm start</code>",id:"npm-start",level:3},{value:"<code>npm test</code>",id:"npm-test",level:3},{value:"<code>npm run build</code>",id:"npm-run-build",level:3},{value:"<code>npm run eject</code>",id:"npm-run-eject",level:3},{value:"Learn More",id:"learn-more",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Docusaurus Relative Linking is Treated False-Negative by CI Markdown Link check",id:"docusaurus-relative-linking-is-treated-false-negative-by-ci-markdown-link-check",level:3}],p={toc:s};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This project was bootstrapped with ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/facebook/create-react-app"},"Create React App"),"."),(0,o.kt)("h2",{id:"available-scripts"},"Available Scripts"),(0,o.kt)("p",null,"In the project directory, you can run:"),(0,o.kt)("h3",{id:"npm-start"},(0,o.kt)("inlineCode",{parentName:"h3"},"npm start")),(0,o.kt)("p",null,"Runs the app in the development mode. Open ",(0,o.kt)("a",{parentName:"p",href:"http://localhost:3000"},"http://localhost:3000")," to view it in the browser."),(0,o.kt)("p",null,"The page will reload if you make edits. You will also see any lint errors in the console."),(0,o.kt)("h3",{id:"npm-test"},(0,o.kt)("inlineCode",{parentName:"h3"},"npm test")),(0,o.kt)("p",null,"Launches the test runner in the interactive watch mode. See the section about\n",(0,o.kt)("a",{parentName:"p",href:"https://facebook.github.io/create-react-app/docs/running-tests"},"running tests")," for more information."),(0,o.kt)("h3",{id:"npm-run-build"},(0,o.kt)("inlineCode",{parentName:"h3"},"npm run build")),(0,o.kt)("p",null,"Builds the app for production to the ",(0,o.kt)("inlineCode",{parentName:"p"},"build")," folder. It correctly bundles React in production mode and optimizes the\nbuild for the best performance."),(0,o.kt)("p",null,"The build is minified and the filenames include the hashes. Your app is ready to be deployed!"),(0,o.kt)("p",null,"See the section about ",(0,o.kt)("a",{parentName:"p",href:"https://facebook.github.io/create-react-app/docs/deployment"},"deployment")," for more information."),(0,o.kt)("h3",{id:"npm-run-eject"},(0,o.kt)("inlineCode",{parentName:"h3"},"npm run eject")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note: this is a one-way operation. Once you ",(0,o.kt)("inlineCode",{parentName:"strong"},"eject"),", you can\u2019t go back!")),(0,o.kt)("p",null,"If you aren\u2019t satisfied with the build tool and configuration choices, you can ",(0,o.kt)("inlineCode",{parentName:"p"},"eject")," at any time. This command will\nremove the single build dependency from your project."),(0,o.kt)("p",null,"Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right\ninto your project so you have full control over them. All of the commands except ",(0,o.kt)("inlineCode",{parentName:"p"},"eject")," will still work, but they will\npoint to the copied scripts so you can tweak them. At this point you\u2019re on your own."),(0,o.kt)("p",null,"You don\u2019t have to ever use ",(0,o.kt)("inlineCode",{parentName:"p"},"eject"),". The curated feature set is suitable for small and middle deployments, and you\nshouldn\u2019t feel obligated to use this feature. However we understand that this tool wouldn\u2019t be useful if you couldn\u2019t\ncustomize it when you are ready for it."),(0,o.kt)("h2",{id:"learn-more"},"Learn More"),(0,o.kt)("p",null,"You can learn more in the\n",(0,o.kt)("a",{parentName:"p",href:"https://facebook.github.io/create-react-app/docs/getting-started"},"Create React App documentation"),"."),(0,o.kt)("p",null,"To learn React, check out the ",(0,o.kt)("a",{parentName:"p",href:"https://reactjs.org/"},"React documentation"),"."),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("h3",{id:"docusaurus-relative-linking-is-treated-false-negative-by-ci-markdown-link-check"},"Docusaurus Relative Linking is Treated False-Negative by CI Markdown Link check"),(0,o.kt)("p",null,"CI check for Markdown link (",(0,o.kt)("inlineCode",{parentName:"p"},"markdown-link-check"),") is turned on and it's not smart enough to detect relative linking by\nDocusaurus. The workaround is to disable the link check at the relevant line. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-markdown"},"\x3c!-- markdown-link-check-disable --\x3e\nknown. Additionally, this process makes it easy to implement a [blue-green deployment](continuous-delivery) or\n\x3c!-- markdown-link-check-enable --\x3e\n")))}d.isMDXComponent=!0}}]);