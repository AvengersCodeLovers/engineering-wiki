"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9435],{644:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>l,default:()=>a,frontMatter:()=>c,metadata:()=>o,toc:()=>t});var i=s(5893),r=s(1151);const c={},l=void 0,o={id:"ruby_on_rails/deploy",title:"deploy",description:"Deploy m\u1ed9t \u1ee9ng d\u1ee5ng l\xean Server c\u1ea7n tr\u1ea3i qua nhi\u1ec1u b\u01b0\u1edbc, do v\u1eady t\u1ed1n nhi\u1ec1u th\u1eddi gian v\xe0 d\u1ec5 x\u1ea3y ra l\u1ed7i. C\xf3 th\u1ec3 t\u1ef1 \u0111\u1ed9ng h\xf3a vi\u1ec7c deploy th\xf4ng qua Capistrano. Capistrano \u0111\u01b0\u1ee3c thi\u1ebft l\u1eadp \u0111\u1ec3 deploy ch\u1ec9 v\u1edbi 1 c\xe2u l\u1ec7nh.",source:"@site/docs/ruby_on_rails/deploy.md",sourceDirName:"ruby_on_rails",slug:"/ruby_on_rails/deploy",permalink:"/engineering-wiki/docs/ruby_on_rails/deploy",draft:!1,unlisted:!1,editUrl:"https://github.com/AvengersCodeLovers/engineering-wiki/tree/main/docs/ruby_on_rails/deploy.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Ruby on Rails v\u1edbi Docker",permalink:"/engineering-wiki/docs/ruby_on_rails/docker_with_ror"},next:{title:"Performance Testing",permalink:"/engineering-wiki/docs/category/performance-testing"}},d={},t=[{value:"1. C\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh Capistrano",id:"1-c\xe0i-\u0111\u1eb7t-v\xe0-c\u1ea5u-h\xecnh-capistrano",level:3},{value:"2. T\u1ea1o user deploy",id:"2-t\u1ea1o-user-deploy",level:3},{value:"3. C\xe0i \u0111\u1eb7t Ruby On Rails",id:"3-c\xe0i-\u0111\u1eb7t-ruby-on-rails",level:3},{value:"4. C\xe0i \u0111\u1eb7t mysql v\xe0 t\u1ea1o Database",id:"4-c\xe0i-\u0111\u1eb7t-mysql-v\xe0-t\u1ea1o-database",level:3},{value:"5. C\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh nginx",id:"5-c\xe0i-\u0111\u1eb7t-v\xe0-c\u1ea5u-h\xecnh-nginx",level:3},{value:"6. Deploy",id:"6-deploy",level:3},{value:"7. RollBack",id:"7-rollback",level:3},{value:"8. Deploy nhi\u1ec1u Server c\xf9ng l\xfac",id:"8-deploy-nhi\u1ec1u-server-c\xf9ng-l\xfac",level:3}];function h(n){const e={a:"a",code:"code",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.p,{children:"Deploy m\u1ed9t \u1ee9ng d\u1ee5ng l\xean Server c\u1ea7n tr\u1ea3i qua nhi\u1ec1u b\u01b0\u1edbc, do v\u1eady t\u1ed1n nhi\u1ec1u th\u1eddi gian v\xe0 d\u1ec5 x\u1ea3y ra l\u1ed7i. C\xf3 th\u1ec3 t\u1ef1 \u0111\u1ed9ng h\xf3a vi\u1ec7c deploy th\xf4ng qua Capistrano. Capistrano \u0111\u01b0\u1ee3c thi\u1ebft l\u1eadp \u0111\u1ec3 deploy ch\u1ec9 v\u1edbi 1 c\xe2u l\u1ec7nh."}),"\n",(0,i.jsxs)(e.p,{children:["C\xe1c files c\u1ea5u h\xecnh \u0111\u01b0\u1ee3c \u0111\u1eb7t trong ",(0,i.jsx)(e.strong,{children:"static/deploy_config/"})]}),"\n",(0,i.jsx)(e.h3,{id:"1-c\xe0i-\u0111\u1eb7t-v\xe0-c\u1ea5u-h\xecnh-capistrano",children:"1. C\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh Capistrano"}),"\n",(0,i.jsx)(e.p,{children:"Capistrano deploy b\u1eb1ng SSH. Do \u0111\xf3, c\u1ea7n \u0111\u1ea3m b\u1ea3o SSH \u0111\xe3 \u0111\u01b0\u1ee3c set up."}),"\n",(0,i.jsxs)(e.p,{children:["Capistrano s\u1eed d\u1ee5ng h\u1ec7 th\u1ed1ng ph\xe2n c\u1ea5p th\u01b0 m\u1ee5c \u0111\u01b0\u1ee3c x\xe1c \u0111\u1ecbnh nghi\xeam ng\u1eb7t tr\xean m\u1ed7i Server \u0111\u1ec3 t\u1ed5 ch\u1ee9c source code v\xe0 c\xe1c d\u1eef li\u1ec7u li\xean quan \u0111\u1ebfn deploy. \u0110\u01b0\u1eddng d\u1eabn g\u1ed1c c\u1ee7a c\u1ea5u tr\xfac n\xe0y \u0111\u01b0\u1ee3c x\xe1c \u0111\u1ecbnh b\u1eb1ng bi\u1ebfn ",(0,i.jsx)(e.code,{children:":deploy_to"})," trong file ",(0,i.jsx)(e.strong,{children:"config/deploy.rb"}),"."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"\u251c\u2500\u2500 current -> /var/www/[app_name]/releases/20150120114500/\n\u251c\u2500\u2500 releases\n\u2502   \u251c\u2500\u2500 20150080072500\n\u2502   \u251c\u2500\u2500 20150090083000\n\u2502   \u251c\u2500\u2500 20150100093500\n\u2502   \u251c\u2500\u2500 20150110104000\n\u2502   \u2514\u2500\u2500 20150120114500\n\u251c\u2500\u2500 repo\n\u2502   \u2514\u2500\u2500 <VCS related data>\n\u251c\u2500\u2500 revisions.log\n\u2514\u2500\u2500 shared\n    \u2514\u2500\u2500 <linked_files and linked_dirs>\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"current"}),": Tr\u1ecf \u0111\u1ebfn b\u1ea3n deploy th\xe0nh c\xf4ng m\u1edbi nh\u1ea5t"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"releases"}),": L\u01b0u gi\u1eef c\xe1c phi\xean b\u1ea3n \u0111\xe3 \u0111\u01b0\u1ee3c deploy c\u1ee7a \u1ee9ng d\u1ee5ng"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"repo"}),": L\u01b0u gi\u1eef Git repository"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"revisions.log"}),": \u0110\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 ghi log m\u1ed7i l\u1ea7n deploy ho\u1eb7c rollback"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"shared"}),": L\u01b0u tr\u1eef nh\u1eefng file c\u1ed1 \u0111\u1ecbnh trong qu\xe1 tr\xecnh deploy"]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["\u0110\u1ec3 c\xe0i \u0111\u1eb7t, th\xeam n\u1ed9i dung sau v\xe0o ",(0,i.jsx)(e.strong,{children:"Gemfile"}),":"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'group :staging, :production do\n  gem "capistrano"\n  gem "capistrano-rails"\n  gem "capistrano-bundler"\n  gem "capistrano-rvm"\n  gem "capistrano3-puma"\nend\n'})}),"\n",(0,i.jsxs)(e.p,{children:["C\xe0i c\xe1c gem m\u1edbi ch\u1ea1y: ",(0,i.jsx)(e.code,{children:"bundle install"})]}),"\n",(0,i.jsxs)(e.p,{children:["Kh\u1edfi t\u1ea1o Capistrano v\u1edbi l\u1ec7nh: ",(0,i.jsx)(e.code,{children:"bundle exec cap install"}),". L\u1ec7nh n\xe0y t\u1ea1o ra c\xe1c files:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"\u251c\u2500\u2500 Capfile\n\u251c\u2500\u2500 config\n\u2502   \u251c\u2500\u2500 deploy\n\u2502   \u2502   \u251c\u2500\u2500 production.rb\n\u2502   \u2502   \u2514\u2500\u2500 staging.rb\n\u2502   \u2514\u2500\u2500 deploy.rb\n\u2514\u2500\u2500 lib\n    \u2514\u2500\u2500 capistrano\n            \u2514\u2500\u2500 tasks\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Capfile"}),": \u0110\u1ecbnh ngh\u0129a c\xe1c th\u01b0 vi\u1ec7n con c\u1ee7a Capistrano d\xf9ng cho deploy"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"config/deploy.rb"}),": C\u1ea5u h\xecnh chung cho t\u1ea5t c\u1ea3 c\xe1c m\xf4i tr\u01b0\u1eddng, c\u1ea7n l\u01b0u \xfd 3 m\u1ee5c d\u01b0\u1edbi, ngo\xe0i ra xem th\xeam t\u1ea1i ",(0,i.jsx)(e.a,{href:"https://capistranorb.com/documentation/getting-started/configuration/",children:"\u0111\xe2y"}),":","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:":application"}),": T\xean c\u1ee7a \u1ee9ng d\u1ee5ng"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:":repo_url"}),": URL t\u1edbi Git repository"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:":linked_files"}),": Li\u1ec7t k\xea c\xe1c files \u0111\u01b0\u1ee3c s\u1ebd \u0111\u01b0\u1ee3c li\xean k\u1ebft t\u1eeb th\u01b0 m\u1ee5c shared v\xe0o m\u1ed7i th\u01b0 m\u1ee5c trong release. M\u1eb7c \u0111\u1ecbnh ",(0,i.jsx)(e.code,{children:"[]"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"config/deploy/"}),": Ch\u1ee9a c\u1ea5u h\xecnh c\u1ee5 th\u1ec3 cho t\u1eebng m\xf4i tr\u01b0\u1eddng"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"lib/capistrano/tasks/"}),": N\u01a1i \u0111\u1ecbnh ngh\u0129a c\xe1c custom tasks"]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"2-t\u1ea1o-user-deploy",children:"2. T\u1ea1o user deploy"}),"\n",(0,i.jsxs)(e.p,{children:["T\u1ea1o m\u1ed9t user c\xf3 t\xean deploy: ",(0,i.jsx)(e.code,{children:"sudo adduser deploy"})]}),"\n",(0,i.jsxs)(e.p,{children:["Khi deploy c\u1ea7n c\xe0i \u0111\u1eb7t m\u1ed9t s\u1ed1 packages do v\u1eady user deploy c\u1ea7n c\xf3 quy\u1ec1n root, th\xeam user deploy v\xe0o group sudo nh\u01b0 sau: ",(0,i.jsx)(e.code,{children:"sudo usermod -aG sudo deploy"})]}),"\n",(0,i.jsxs)(e.p,{children:["\u0110\u1ec3 ssh v\xe0o Server b\u1eb1ng user deploy c\u1ea7n th\xeam public key t\u1eeb local v\xe0o file ",(0,i.jsx)(e.strong,{children:"authorezied_keys"})," c\u1ee7a user deploy:"]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u1ede local, ch\u1ea1y l\u1ec7nh sau \u0111\u1ec3 in ra public key: ",(0,i.jsx)(e.code,{children:"cat ~/.ssh/id_rsa.pub"})]}),"\n",(0,i.jsxs)(e.li,{children:["ssh l\u1ea1i v\xe0o server, chuy\u1ec3n qua user deploy, t\u1ea1o file ",(0,i.jsx)(e.strong,{children:"authorized_keys"})," v\xe0 paste public key v\xe0o:"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"ssh [username]@[host_ip_address]\nsu - deploy\nmkdir ~/.ssh\nvim ~/.ssh/authorized_keys\n"})}),"\n",(0,i.jsx)(e.h3,{id:"3-c\xe0i-\u0111\u1eb7t-ruby-on-rails",children:"3. C\xe0i \u0111\u1eb7t Ruby On Rails"}),"\n",(0,i.jsxs)(e.p,{children:["Truy c\u1eadp ",(0,i.jsx)(e.a,{href:"https://gorails.com/setup/ubuntu/24.04",children:"https://gorails.com/setup/ubuntu/24.04"}),", ch\u1ecdn phi\xean b\u1ea3n OS ph\xf9 h\u1ee3p v\xe0 l\xe0m theo h\u01b0\u1edbng d\u1eabn."]}),"\n",(0,i.jsx)(e.h3,{id:"4-c\xe0i-\u0111\u1eb7t-mysql-v\xe0-t\u1ea1o-database",children:"4. C\xe0i \u0111\u1eb7t mysql v\xe0 t\u1ea1o Database"}),"\n",(0,i.jsx)(e.p,{children:"C\xe0i \u0111\u1eb7t MySQL:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"sudo apt update\nsudo apt install mysql-server\n"})}),"\n",(0,i.jsxs)(e.p,{children:["Ch\u1ea1y security script: ",(0,i.jsx)(e.code,{children:"sudo mysql_secure_installation"}),". N\u1ebfu g\u1eb7p l\u1ed7i, thay \u0111\u1ed5i ph\u01b0\u01a1ng th\u1ee9c x\xe1c th\u1ef1c c\u1ee7a user root th\xe0nh ",(0,i.jsx)(e.code,{children:"password"})," r\u1ed3i th\u1eed l\u1ea1i:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"sudo mysql\nmysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';\nmysql> exit\n"})}),"\n",(0,i.jsx)(e.p,{children:"T\u1ea1o Database:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"mysql -uroot -p\nmysql> CREATE DATABASE [databasename];\n"})}),"\n",(0,i.jsx)(e.h3,{id:"5-c\xe0i-\u0111\u1eb7t-v\xe0-c\u1ea5u-h\xecnh-nginx",children:"5. C\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh nginx"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"sudo apt update\nsudo apt install nginx\n"})}),"\n",(0,i.jsxs)(e.p,{children:["T\u1ea1o file ",(0,i.jsx)(e.strong,{children:"/etc/nginx/sites-enablede/[domain]"}),", copy n\u1ed9i dung t\u1eeb ",(0,i.jsx)(e.strong,{children:"static/deploy_config/nginx.conf.sample"}),", ch\xfa \xfd 1 s\u1ed1 d\xf2ng sau v\xe0 s\u1eeda l\u1ea1i cho ph\xf9 h\u1ee3p:"]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"server [path]"}),": \u0110\u01b0\u1eddng d\u1eabn \u0111\u1ebfn file puma.sock"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"server_name"}),": T\xean Server"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"root"}),": \u0110\u01b0\u1eddng d\u1eabn \u0111\u1ebfn th\u01b0 m\u1ee5c public c\u1ee7a \u1ee9ng d\u1ee5ng"]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["Kh\u1edfi \u0111\u1ed9ng l\u1ea1i nginx: ",(0,i.jsx)(e.code,{children:"sudo systemctl restart nginx"})]}),"\n",(0,i.jsx)(e.h3,{id:"6-deploy",children:"6. Deploy"}),"\n",(0,i.jsx)(e.p,{children:"Commit source code l\xean Github."}),"\n",(0,i.jsx)(e.p,{children:"Th\xeam c\xe1c files:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"config/database.yml"}),": ",(0,i.jsx)(e.code,{children:"username"})," \u0111\u1ec3 l\xe0 ",(0,i.jsx)(e.code,{children:"root"})," v\xe0 ",(0,i.jsx)(e.code,{children:"password"})," v\u1eeba c\xe0i \u0111\u1eb7t \u1edf tr\xean"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"config/master.key"})," v\xe0 ",(0,i.jsx)(e.strong,{children:"config/credentials.yml.enc"}),": Ch\u1ea1y ",(0,i.jsx)(e.code,{children:"EDITOR=vim rails credentials:edit"})," \u0111\u1ec3 t\u1ea1o m\u1edbi"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.strong,{children:"config/application.yml"})}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["Copy c\xe1c files tr\xean v\xe0o ",(0,i.jsx)(e.strong,{children:"/var/www/[app_name]/shared/config/"})]}),"\n",(0,i.jsxs)(e.p,{children:["Copy ",(0,i.jsx)(e.strong,{children:"puma.service"}),", ",(0,i.jsx)(e.strong,{children:"sidekiq.service"})," v\xe0o ",(0,i.jsx)(e.strong,{children:"/etc/systemd/system/"})]}),"\n",(0,i.jsx)(e.p,{children:"S\u1eeda file Sudoers \u0111\u1ec3 kh\xf4ng c\u1ea7n x\xe1c nh\u1eadn m\u1eadt kh\u1ea9u khi ch\u1ea1y c\xe1c l\u1ec7nh v\u1edbi puma, sidekiq:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"sudo -i\nvisudo\n# Th\xeam n\u1ed9i dung sau:\ndeploy ALL=NOPASSWD: /usr/sbin/service puma start\ndeploy ALL=NOPASSWD: /usr/sbin/service puma restart\ndeploy ALL=NOPASSWD: /usr/sbin/service puma stop\n\ndeploy ALL=NOPASSWD: /usr/sbin/service sidekiq start\ndeploy ALL=NOPASSWD: /usr/sbin/service sidekiq restart\ndeploy ALL=NOPASSWD: /usr/sbin/service sidekiq stop\n"})}),"\n",(0,i.jsx)(e.p,{children:"\u0110\u1ec3 c\xf3 th\u1ec3 ch\u1ea1y script deploy \u1edf b\u1ea5t k\xec \u0111\xe2u:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Copy ",(0,i.jsx)(e.strong,{children:"deploy_bin"})," v\xe0o ",(0,i.jsx)(e.strong,{children:"/home/deploy/"})]}),"\n",(0,i.jsxs)(e.li,{children:["S\u1eeda ",(0,i.jsx)(e.code,{children:"PATH"})," trong file ",(0,i.jsx)(e.strong,{children:"~/.bash_profile"})]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"vim ~/.bash_profile\n# S\u1eeda PATH th\xe0nh:\nPATH=$PATH:$HOME/.local/bin:$HOME/bin:$HOME/deploy_bin\n# L\u01b0u thay \u0111\u1ed5i v\xe0 ch\u1ea1y l\u1ec7nh:\nsource ~/.bash_profile\n"})}),"\n",(0,i.jsx)(e.p,{children:"Cu\u1ed1i c\xf9ng, ch\u1ea1y:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["deploy tag: ",(0,i.jsx)(e.code,{children:"deploy branch [branch_name] [stage]"})]}),"\n",(0,i.jsxs)(e.li,{children:["deploy branch: ",(0,i.jsx)(e.code,{children:"deploy branch [branch_name] [stage]"})]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"7-rollback",children:"7. RollBack"}),"\n",(0,i.jsx)(e.p,{children:"M\u1eb7c \u0111\u1ecbnh Capistrano s\u1ebd l\u01b0u l\u1ea1i 5 phi\xean b\u1ea3n deploy th\xe0nh c\xf4ng g\u1ea7n nh\u1ea5t, c\xf3 th\u1ec3 rollback v\u1ec1 b\u1ea5t k\u1ef3 phi\xean b\u1ea3n n\xe0o trong \u0111\xf3:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Rollback v\u1ec1 phi\xean b\u1ea3n ngay tr\u01b0\u1edbc \u0111\xf3: ",(0,i.jsx)(e.code,{children:"bundle exec cap [stage] deploy:rollback"})]}),"\n",(0,i.jsxs)(e.li,{children:["Rollback v\u1ec1 phi\xean b\u1ea3n c\u0169 h\u01a1n: ",(0,i.jsx)(e.code,{children:"bundle exec cap [stage] deploy:rollback ROLLBACK_RELEASE=[timestamped_folder_in_releases_folder]"})]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"8-deploy-nhi\u1ec1u-server-c\xf9ng-l\xfac",children:"8. Deploy nhi\u1ec1u Server c\xf9ng l\xfac"}),"\n",(0,i.jsxs)(e.p,{children:["Th\xeam file ",(0,i.jsx)(e.strong,{children:"config/deploy/instances_utils.rb"}),", ",(0,i.jsx)(e.strong,{children:"config/deploy/settings.yml"})]}),"\n",(0,i.jsxs)(e.p,{children:["B\u1ecf comment d\xf2ng ",(0,i.jsx)(e.code,{children:"set :instances, get_intances_targets"})," trong ",(0,i.jsx)(e.strong,{children:"config/deploy.rb"})]}),"\n",(0,i.jsxs)(e.p,{children:["Comment ",(0,i.jsx)(e.code,{children:"server ..."})," trong ",(0,i.jsx)(e.strong,{children:"config/deploy/staging.rb"})," v\xe0 ",(0,i.jsx)(e.strong,{children:"config/deploy/production.rb"})," v\xe0 th\xeam \u0111o\u1ea1n sau:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:'instances = fetch(:instances)\n\ninstances.each do |role_name, hosts|\n  hosts.each_with_index do |host, i|\n    roles = [role_name]\n    roles << "db" if i == 0\n    server host, user: "deploy", roles: roles\n  end\nend\n'})}),"\n",(0,i.jsx)(e.p,{children:"L\u1ec7nh deploy thay \u0111\u1ed5i nh\u01b0 sau:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["deploy tag: ",(0,i.jsx)(e.code,{children:"deploy branch [branch_name] [stage] [instance_name_1],[instance_name_1]"})]}),"\n",(0,i.jsxs)(e.li,{children:["deploy branch: ",(0,i.jsx)(e.code,{children:"deploy branch [branch_name] [stage] [instance_name_1],[instance_name_1]"})]}),"\n"]})]})}function a(n={}){const{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},1151:(n,e,s)=>{s.d(e,{Z:()=>o,a:()=>l});var i=s(7294);const r={},c=i.createContext(r);function l(n){const e=i.useContext(c);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),i.createElement(c.Provider,{value:e},n.children)}}}]);