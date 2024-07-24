"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9808],{5646:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>s,contentTitle:()=>d,default:()=>a,frontMatter:()=>l,metadata:()=>o,toc:()=>t});var c=i(5893),r=i(1151);const l={sidebar_position:3},d="Ruby on Rails v\u1edbi Docker",o={id:"ruby_on_rails/docker_with_ror",title:"Ruby on Rails v\u1edbi Docker",description:"1. Gi\u1edbi Thi\u1ec7u",source:"@site/docs/ruby_on_rails/docker_with_ror.md",sourceDirName:"ruby_on_rails",slug:"/ruby_on_rails/docker_with_ror",permalink:"/engineering-wiki/docs/ruby_on_rails/docker_with_ror",draft:!1,unlisted:!1,editUrl:"https://github.com/AvengersCodeLovers/engineering-wiki/tree/main/docs/ruby_on_rails/docker_with_ror.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Coding conventions",permalink:"/engineering-wiki/docs/ruby_on_rails/coding-conventions"},next:{title:"deploy",permalink:"/engineering-wiki/docs/ruby_on_rails/deploy"}},s={},t=[{value:"1. Gi\u1edbi Thi\u1ec7u",id:"1-gi\u1edbi-thi\u1ec7u",level:2},{value:"1.1. M\u1ee5c \u0110\xedch",id:"11-m\u1ee5c-\u0111\xedch",level:3},{value:"1.2. \u0110\u1ed1i T\u01b0\u1ee3ng S\u1eed D\u1ee5ng",id:"12-\u0111\u1ed1i-t\u01b0\u1ee3ng-s\u1eed-d\u1ee5ng",level:3},{value:"2. C\xe0i \u0110\u1eb7t C\xe1c C\xf4ng C\u1ee5 C\u1ea7n Thi\u1ebft",id:"2-c\xe0i-\u0111\u1eb7t-c\xe1c-c\xf4ng-c\u1ee5-c\u1ea7n-thi\u1ebft",level:2},{value:"2.1. C\xe0i \u0110\u1eb7t Docker",id:"21-c\xe0i-\u0111\u1eb7t-docker",level:3},{value:"H\u01b0\u1edbng D\u1eabn C\xe0i \u0110\u1eb7t",id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t",level:4},{value:"T\xe0i Li\u1ec7u Tham Kh\u1ea3o",id:"t\xe0i-li\u1ec7u-tham-kh\u1ea3o",level:4},{value:"2.2. C\xe0i \u0110\u1eb7t Docker Compose",id:"22-c\xe0i-\u0111\u1eb7t-docker-compose",level:3},{value:"H\u01b0\u1edbng D\u1eabn C\xe0i \u0110\u1eb7t",id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t-1",level:4},{value:"T\xe0i Li\u1ec7u Tham Kh\u1ea3o",id:"t\xe0i-li\u1ec7u-tham-kh\u1ea3o-1",level:4},{value:"3. C\u1ea5u H\xecnh Docker",id:"3-c\u1ea5u-h\xecnh-docker",level:2},{value:"3.1. T\u1ea1o Dockerfile",id:"31-t\u1ea1o-dockerfile",level:3},{value:"M\u1ee5c \u0110\xedch",id:"m\u1ee5c-\u0111\xedch",level:4},{value:"N\u1ed9i Dung",id:"n\u1ed9i-dung",level:4},{value:"3.2. T\u1ea1o docker-compose.yml",id:"32-t\u1ea1o-docker-composeyml",level:3},{value:"M\u1ee5c \u0110\xedch",id:"m\u1ee5c-\u0111\xedch-1",level:4},{value:"N\u1ed9i Dung",id:"n\u1ed9i-dung-1",level:4},{value:"3.3. T\u1ea1o .dockerignore",id:"33-t\u1ea1o-dockerignore",level:3},{value:"M\u1ee5c \u0110\xedch",id:"m\u1ee5c-\u0111\xedch-2",level:4},{value:"N\u1ed9i Dung",id:"n\u1ed9i-dung-2",level:4},{value:"3.4 C\u1ea5u h\xecnh database, mailhog, sideki",id:"34-c\u1ea5u-h\xecnh-database-mailhog-sideki",level:3},{value:"4. M\u1ed9t s\u1ed1 CLI rails hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng v\u1edbi Docker",id:"4-m\u1ed9t-s\u1ed1-cli-rails-hay-\u0111\u01b0\u1ee3c-s\u1eed-d\u1ee5ng-v\u1edbi-docker",level:2},{value:"4.1. docker build, up, down",id:"41-docker-build-up-down",level:3},{value:"4.2. docker start, restart, stop container",id:"42-docker-start-restart-stop-container",level:3},{value:"4.3. create, migrate database, bundle",id:"43-create-migrate-database-bundle",level:3},{value:"4.4. rails c, attach with binding.pry",id:"44-rails-c-attach-with-bindingpry",level:3},{value:"5. K\u1ebft lu\u1eadn",id:"5-k\u1ebft-lu\u1eadn",level:2}];function h(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.h1,{id:"ruby-on-rails-v\u1edbi-docker",children:"Ruby on Rails v\u1edbi Docker"}),"\n",(0,c.jsx)(e.h2,{id:"1-gi\u1edbi-thi\u1ec7u",children:"1. Gi\u1edbi Thi\u1ec7u"}),"\n",(0,c.jsx)(e.h3,{id:"11-m\u1ee5c-\u0111\xedch",children:"1.1. M\u1ee5c \u0110\xedch"}),"\n",(0,c.jsx)(e.p,{children:"M\u1ee5c \u0111\xedch c\u1ee7a b\u1ed9 ti\xeau chu\u1ea9n n\xe0y l\xe0 h\u01b0\u1edbng d\u1eabn c\xe1ch thi\u1ebft l\u1eadp m\xf4i tr\u01b0\u1eddng ph\xe1t tri\u1ec3n Ruby on Rails s\u1eed d\u1ee5ng Docker."}),"\n",(0,c.jsx)(e.h3,{id:"12-\u0111\u1ed1i-t\u01b0\u1ee3ng-s\u1eed-d\u1ee5ng",children:"1.2. \u0110\u1ed1i T\u01b0\u1ee3ng S\u1eed D\u1ee5ng"}),"\n",(0,c.jsx)(e.p,{children:"C\xe1c nh\xe0 ph\xe1t tri\u1ec3n Ruby on Rails, \u0111\u1ed9i ng\u0169 IT, v\xe0 b\u1ea5t k\u1ef3 ai mu\u1ed1n thi\u1ebft l\u1eadp m\xf4i tr\u01b0\u1eddng Rails v\u1edbi Docker."}),"\n",(0,c.jsx)(e.h2,{id:"2-c\xe0i-\u0111\u1eb7t-c\xe1c-c\xf4ng-c\u1ee5-c\u1ea7n-thi\u1ebft",children:"2. C\xe0i \u0110\u1eb7t C\xe1c C\xf4ng C\u1ee5 C\u1ea7n Thi\u1ebft"}),"\n",(0,c.jsx)(e.h3,{id:"21-c\xe0i-\u0111\u1eb7t-docker",children:"2.1. C\xe0i \u0110\u1eb7t Docker"}),"\n",(0,c.jsx)(e.h4,{id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t",children:"H\u01b0\u1edbng D\u1eabn C\xe0i \u0110\u1eb7t"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"Windows:"})," ",(0,c.jsx)(e.a,{href:"https://docs.docker.com/docker-for-windows/install/",children:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Docker tr\xean Windows"})]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"macOS:"})," ",(0,c.jsx)(e.a,{href:"https://docs.docker.com/docker-for-mac/install/",children:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Docker tr\xean macOS"})]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"Linux:"})," ",(0,c.jsx)(e.a,{href:"https://docs.docker.com/engine/install/",children:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Docker tr\xean Linux"})]}),"\n"]}),"\n",(0,c.jsx)(e.h4,{id:"t\xe0i-li\u1ec7u-tham-kh\u1ea3o",children:"T\xe0i Li\u1ec7u Tham Kh\u1ea3o"}),"\n",(0,c.jsx)(e.p,{children:(0,c.jsx)(e.a,{href:"https://docs.docker.com/",children:"Docker Documentation"})}),"\n",(0,c.jsx)(e.h3,{id:"22-c\xe0i-\u0111\u1eb7t-docker-compose",children:"2.2. C\xe0i \u0110\u1eb7t Docker Compose"}),"\n",(0,c.jsx)(e.h4,{id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t-1",children:"H\u01b0\u1edbng D\u1eabn C\xe0i \u0110\u1eb7t"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"Windows/macOS/Linux:"})," ",(0,c.jsx)(e.a,{href:"https://docs.docker.com/compose/install/",children:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Docker Compose"})]}),"\n"]}),"\n",(0,c.jsx)(e.h4,{id:"t\xe0i-li\u1ec7u-tham-kh\u1ea3o-1",children:"T\xe0i Li\u1ec7u Tham Kh\u1ea3o"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://docs.docker.com/compose/",children:"Docker Compose Documentation"})}),"\n"]}),"\n",(0,c.jsx)(e.h2,{id:"3-c\u1ea5u-h\xecnh-docker",children:"3. C\u1ea5u H\xecnh Docker"}),"\n",(0,c.jsx)(e.h3,{id:"31-t\u1ea1o-dockerfile",children:"3.1. T\u1ea1o Dockerfile"}),"\n",(0,c.jsx)(e.h4,{id:"m\u1ee5c-\u0111\xedch",children:"M\u1ee5c \u0110\xedch"}),"\n",(0,c.jsx)(e.p,{children:"Gi\u1ea3i th\xedch m\u1ee5c \u0111\xedch c\u1ee7a Dockerfile trong vi\u1ec7c x\xe2y d\u1ef1ng Docker image."}),"\n",(0,c.jsx)(e.h4,{id:"n\u1ed9i-dung",children:"N\u1ed9i Dung"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"C\xe0i \u0111\u1eb7t Ruby v\xe0 c\xe1c dependencies."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"Sao ch\xe9p m\xe3 ngu\u1ed3n v\xe0o container."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"Thi\u1ebft l\u1eadp l\u1ec7nh kh\u1edfi \u0111\u1ed9ng container."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"File c\u1ea5u h\xecnh:"}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-DockerFile",children:"# S\u1eed d\u1ee5ng image c\u1ee7a Ruby\nFROM ruby:3.1\n\nENV APP_ROOT /app\n# C\xe0i \u0111\u1eb7t c\xe1c g\xf3i ph\u1ee5 thu\u1ed9c\nRUN apt-get update -qq && apt-get install -y \\\n    build-essential \\\n    libpq-dev \\\n    nodejs \\\n    yarn\n\n# Thi\u1ebft l\u1eadp th\u01b0 m\u1ee5c l\xe0m vi\u1ec7c\nWORKDIR /app\n\n# Sao ch\xe9p file Gemfile v\xe0 Gemfile.lock v\xe0o th\u01b0 m\u1ee5c l\xe0m vi\u1ec7c\nCOPY ./Gemfile $APP_ROOT\nCOPY ./Gemfile.lock $APP_ROOT\n\n# C\xe0i \u0111\u1eb7t c\xe1c gem \u0111\u01b0\u1ee3c li\u1ec7t k\xea trong Gemfile\nRUN bundle install\n\n# Sao ch\xe9p to\xe0n b\u1ed9 m\xe3 ngu\u1ed3n \u1ee9ng d\u1ee5ng v\xe0o th\u01b0 m\u1ee5c l\xe0m vi\u1ec7c\nCOPY . $APP_ROOT\n\n# Timezone (n\u1ebfu c\u1ea7n)\nRUN ln -sf  /usr/share/zoneinfo/Asia/Ho_CHi_Minh /etc/localtime\n"})}),"\n",(0,c.jsx)(e.h3,{id:"32-t\u1ea1o-docker-composeyml",children:"3.2. T\u1ea1o docker-compose.yml"}),"\n",(0,c.jsx)(e.h4,{id:"m\u1ee5c-\u0111\xedch-1",children:"M\u1ee5c \u0110\xedch"}),"\n",(0,c.jsx)(e.p,{children:"Gi\u1ea3i th\xedch vai tr\xf2 c\u1ee7a docker-compose.yml trong vi\u1ec7c qu\u1ea3n l\xfd c\xe1c d\u1ecbch v\u1ee5."}),"\n",(0,c.jsx)(e.h4,{id:"n\u1ed9i-dung-1",children:"N\u1ed9i Dung"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"C\u1ea5u h\xecnh d\u1ecbch v\u1ee5 cho Ruby on Rails."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"C\u1ea5u h\xecnh d\u1ecbch v\u1ee5 cho c\u01a1 s\u1edf d\u1eef li\u1ec7u (PostgreSQL, MySQL, etc.)."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"C\u1ea5u h\xecnh m\u1ea1ng v\xe0 volume."}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsxs)(e.p,{children:["File c\u1ea5u h\xecnh: ",(0,c.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:i(4279).Z+"",children:"docker-compose"})]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(e.h3,{id:"33-t\u1ea1o-dockerignore",children:"3.3. T\u1ea1o .dockerignore"}),"\n",(0,c.jsx)(e.h4,{id:"m\u1ee5c-\u0111\xedch-2",children:"M\u1ee5c \u0110\xedch"}),"\n",(0,c.jsx)(e.p,{children:"Gi\u1ea3i th\xedch vai tr\xf2 c\u1ee7a .dockerignore trong vi\u1ec7c lo\u1ea1i b\u1ecf c\xe1c t\u1eadp tin kh\xf4ng c\u1ea7n thi\u1ebft khi build Docker image."}),"\n",(0,c.jsx)(e.h4,{id:"n\u1ed9i-dung-2",children:"N\u1ed9i Dung"}),"\n",(0,c.jsx)(e.p,{children:"C\xe1c m\u1ee5c n\xean \u0111\u01b0\u1ee3c lo\u1ea1i b\u1ecf nh\u01b0 th\u01b0 m\u1ee5c node_modules, log, tmp, etc."}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"File c\u1ea5u h\xecnh:"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-.dockerignore",children:".git\nlog/*\ntmp/*\n!.gitkeep\n.bundle\nvendor/bundle\nnode_modules\n"})}),"\n",(0,c.jsx)(e.h3,{id:"34-c\u1ea5u-h\xecnh-database-mailhog-sideki",children:"3.4 C\u1ea5u h\xecnh database, mailhog, sideki"}),"\n",(0,c.jsx)(e.p,{children:"C\xe1c file c\u1ea5u h\xecnh nh\u01b0 database.yml, mailhog, sidekiq.yml v\u1eabn \u0111\u01b0\u1ee3c c\u1ea5u h\xecnh nh\u01b0 b\xecnh th\u01b0\u1eddng, c\xf3 th\u1ec3 tham kh\u1ea3o"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["Database.yml: ",(0,c.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:i(5776).Z+"",children:"database.yml"})]}),"\n",(0,c.jsxs)(e.li,{children:["Sidekiq.yml: ",(0,c.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:i(1043).Z+"",children:"sidekiq.yml"})]}),"\n",(0,c.jsx)(e.li,{children:"Mailhog:"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{children:"#config/environments/development.rb\n\nconfig.action_mailer.delivery_method = :smtp\nconfig.action_mailer.smtp_settings = {\n  address: ENV['MAILHOG_HOST'],\n  port: 1025\n}\n"})}),"\n",(0,c.jsx)(e.h2,{id:"4-m\u1ed9t-s\u1ed1-cli-rails-hay-\u0111\u01b0\u1ee3c-s\u1eed-d\u1ee5ng-v\u1edbi-docker",children:"4. M\u1ed9t s\u1ed1 CLI rails hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng v\u1edbi Docker"}),"\n",(0,c.jsx)(e.h3,{id:"41-docker-build-up-down",children:"4.1. docker build, up, down"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{children:"docker-compose build\ndocker-compose up\ndocker-compose down\n"})}),"\n",(0,c.jsx)(e.h3,{id:"42-docker-start-restart-stop-container",children:"4.2. docker start, restart, stop container"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{children:"docker-compose start {service_name}\ndocker-compose restart {service_name}\ndocker-compose stop {service_name}\n"})}),"\n",(0,c.jsx)(e.h3,{id:"43-create-migrate-database-bundle",children:"4.3. create, migrate database, bundle"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{children:"docker-compose exec runner bundle install\ndocker-compose exec runner rake db:create db:migrate\n"})}),"\n",(0,c.jsx)(e.h3,{id:"44-rails-c-attach-with-bindingpry",children:"4.4. rails c, attach with binding.pry"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{children:"docker-compose exec runner rails c\ndocker attach {container_id}\n"})}),"\n",(0,c.jsx)(e.h2,{id:"5-k\u1ebft-lu\u1eadn",children:"5. K\u1ebft lu\u1eadn"}),"\n",(0,c.jsxs)(e.p,{children:["B\xean tr\xean l\xe0 nh\u1eefng config hay d\xf9ng \u0111\u1ed1i v\u1edbi c\xe1c d\u1ef1 \xe1n Ruby on Rails th\u01b0\u1eddng g\u1eb7p, t\xf9y d\u1ef1 \xe1n, th\xec ch\xfang ta s\u1ebd c\xf3 c\xe1c t\xf9y ch\u1ec9nh ri\xeang. Vi\u1ec7c s\u1eed d\u1ee5ng ",(0,c.jsx)(e.code,{children:"Docker"})," mang l\u1ea1i t\xednh nh\u1ea5t qu\xe1n trong m\xf4i tr\u01b0\u1eddng ph\xe1t tri\u1ec3n, d\u1ec5 d\xe0ng tri\u1ec3n khai, m\u1edf r\u1ed9ng. V\xe0 \u0111\u1eb7c bi\u1ec7t n\xf3 s\u1ebd d\u1ec5 d\xe0ng t\xedch h\u1ee3p v\u1edbi CI/CD v\xe0 K8s, ph\xf9 h\u1ee3p v\u1edbi \u0111\u1ecbnh h\u01b0\u1edbng deploy m\u1edbi c\u1ee7a Sun* trong t\u01b0\u01a1ng lai."]})]})}function a(n={}){const{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(h,{...n})}):h(n)}},5776:(n,e,i)=>{i.d(e,{Z:()=>c});const c=i.p+"assets/files/database-0fb8e17b213645afafe8c40a19e82c56.yml"},4279:(n,e,i)=>{i.d(e,{Z:()=>c});const c=i.p+"assets/files/docker-compose-a881f03ce10a105eff1b444c70decfe8.yml"},1043:(n,e,i)=>{i.d(e,{Z:()=>c});const c=i.p+"assets/files/sidekiq-bcce5e2150998c9a7415a407c94eacc2.yml"},1151:(n,e,i)=>{i.d(e,{Z:()=>o,a:()=>d});var c=i(7294);const r={},l=c.createContext(r);function d(n){const e=c.useContext(l);return c.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:d(n.components),c.createElement(l.Provider,{value:e},n.children)}}}]);