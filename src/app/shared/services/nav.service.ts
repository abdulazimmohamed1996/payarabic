import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalApp } from '../../shared/helper/global';


// Menu
export interface Menu {
	headTitle?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeValue?: string;
	badgeClass?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
	Menusub?: boolean;
	target?: boolean
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;

	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Full screen
	public fullScreen: boolean = false;

	constructor(private router: Router, private app: GlobalApp) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if (evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if (window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next;
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [

		// {
		// 	title: 'Dashboard', icon: 'home', type: 'sub', Menusub: true, active: false, children: [
		// 		{ path: '/dashboard/sales', title: 'Sales', type: 'link' },
		// 	]
		// },
		// {
		// 	title: this.app.GetTranslation('Invoices') , icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
		// 		{ path: '/invoice/list', title: this.app.GetTranslation('Invoices'), type: 'link' },
		// 		{ path: '/invoice/quick', title: this.app.GetTranslation('QuickInvoice'), type: 'link' },
		// 		{ path: '/invoice/manage', title: this.app.GetTranslation('AddInvoice'), type: 'link' },
		// 		{ path: '/invoice/batch', title: this.app.GetTranslation('BatchInvoice'), type: 'link' },

		// 	]
		// }
		// ,
		// {
		// 	title: this.app.GetTranslation('Deposits') , icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
		// 		{ path: '/deposit/list', title: this.app.GetTranslation('Deposits'), type: 'link' },
		// 		{ path: '/deposit/add', title: this.app.GetTranslation('AddDeposit'), type: 'link' },
		// 	]
		// }
		// ,
		// {
		// 	title: this.app.GetTranslation('users'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
		// 		{ path: '/superadmin/list', title: this.app.GetTranslation('supervisors'), type: 'link' },
		// 		{ path: '/admin/list', title:  this.app.GetTranslation('administrators'), type: 'link' },
		// 		{ path: '/vendor/list', title: this.app.GetTranslation('vendors'), type: 'link' },
		// 		{ path: '/user/list', title: this.app.GetTranslation('users'), type: 'link' },
		// 	]
		// }

	]
	private setMenuItems() {
		if (this.app.UserType().toLowerCase() != "user") {
			this.MENUITEMS.push({
				title: this.app.GetTranslation('Invoices'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
					{ path: '/invoice/list', title: this.app.GetTranslation('Invoices'), type: 'link' },
					{ path: '/invoice/quick', title: this.app.GetTranslation('QuickInvoice'), type: 'link' },
					{ path: '/invoice/manage', title: this.app.GetTranslation('AddInvoice'), type: 'link' },
					{ path: '/invoice/batch', title: this.app.GetTranslation('BatchInvoice'), type: 'link' },
				]
			}
			)
		}

		if (this.app.UserType() == "Vendor") {
			this.MENUITEMS.push(
				{
					title: this.app.GetTranslation('Deposits'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/deposit/list', title: this.app.GetTranslation('Deposits'), type: 'link' },
					]
				}
					,
				{
					title: this.app.GetTranslation('PaymentLink'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/paymentlink/list', title: this.app.GetTranslation('PaymentLink'), type: 'link' },
					]
				}
				,
				{
					title: this.app.GetTranslation('ProductLink'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/productlink/list', title: this.app.GetTranslation('ProductLink'), type: 'link' },
					]
				}
				,
				{
					title: this.app.GetTranslation('Products'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/category/list', title: this.app.GetTranslation('Categories'), type: 'link' },
						{ path: '/product/list', title: this.app.GetTranslation('Products'), type: 'link' },
					]
				}
				,
				{
					title: this.app.GetTranslation('users'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/user/list', title: this.app.GetTranslation('users'), type: 'link' },
					]
				}
			)

		}
		if (this.app.UserType().toLowerCase().includes("admin")) {
			this.MENUITEMS.push({
				title: this.app.GetTranslation('Deposits'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
					{ path: '/deposit/list', title: this.app.GetTranslation('Deposits'), type: 'link' },
					{ path: '/deposit/manage', title: this.app.GetTranslation('AddDeposit'), type: 'link' },
				]
			}
				,
				{
					title: this.app.GetTranslation('users'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/superadmin/list', title: this.app.GetTranslation('supervisors'), type: 'link' },
						{ path: '/admin/list', title: this.app.GetTranslation('administrators'), type: 'link' },
						{ path: '/vendor/list', title: this.app.GetTranslation('vendors'), type: 'link' },
					]
				},
				{
					title: this.app.GetTranslation('Settings'), icon: 'grid', type: 'sub', Menusub: true, active: false, children: [
						{ path: '/currency/list', title: this.app.GetTranslation('Currencies'), type: 'link' },
					]
				}
			)

		}
		return this.MENUITEMS
	}
	//this.MENUITEMS = []


	items = new BehaviorSubject<Menu[]>(this.setMenuItems());
}
