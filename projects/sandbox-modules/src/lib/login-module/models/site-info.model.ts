export class SiteInfo {
  maintenance:boolean;
  email:string;
  address:string;
  cellphone:string;
  site_name:string;
  p_iva:string;
  payment_gateway:string;
  sitesocials:Social[];
  constructor() {
    this.maintenance = false;
    this.email = '';
    this.address = '';
    this.cellphone = '';
    this.site_name = '';
    this.p_iva = '';
    this.payment_gateway = '';
    this.sitesocials = [];
  }
}
export interface Social {
  name:string;
  icon:string;
  url:string;
  active:boolean;
}
