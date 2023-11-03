import AddUser  from "./AddUser";
import Calender  from "./Calender";
import Cart  from "./Cart";
import Home  from "./Home";
import Id  from "./Id";
import Logout  from "./Logout";
import Refund  from "./Refund";
import Report  from "./Report";
import Rupee  from "./Rupee";
import Shop  from "./Shop";
import Store  from "./Store";
import UserUpdate  from "./UserUpdate";

const pages = {
  home: '/',
  logout: '/logout',
  addUser: '/adduser',
  order: '/order',
  recharge: '/recharge',
  refund: '/refund',
  report: '/report',
  rfid: '/rfidactivation',
  shop: '/shop',
  userRegistration: '/userregistration',
  userUpdation: '/userupdation',
  category: '/category'
}

export const Images = [
  { pathname: pages.home, page: Home }, 
  { pathname: pages.rfid, page: Id }, 
  { pathname: pages.refund, page: Refund }, 
  { pathname: pages.report, page: Report }, 
  { pathname: pages.recharge, page: Rupee }, 
  { pathname: pages.order, page: Store }, 
  { pathname: pages.addUser, page: AddUser }, 
  { pathname: pages.userUpdation, page: UserUpdate },
  { pathname: pages.logout, page: Logout }
]