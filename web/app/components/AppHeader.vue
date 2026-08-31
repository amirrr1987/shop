<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="page-content">
        <header class="header-wrapper">
            <!-- Header Nav Start -->
            <div class="header-nav">
                <div class="container">
                    <div
                        class="header-nav-wrapper d-md-flex d-sm-flex d-xl-flex d-lg-flex justify-content-between">
                        <div class="header-static-nav">
                            <p>به فروشگاه روزر خوش آمدید!</p>
                        </div>
                        <div class="header-menu-nav">
                            <ul class="menu-nav">
                                <li>
                                    <div class="dropdown">
                                        <button
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >تنظیمات <i class="ion-ios-arrow-down"></i></button>

                                        <ul
                                            class="dropdown-menu animation slideDownIn"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <li>
                                                <RouterLink to="/my-account">حساب من</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/checkout">ثبت نهایی</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/login">ورود</RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown">
                                        <button
                                            type="button"
                                            id="dropdownMenuButton-2"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >تومان <i class="ion-ios-arrow-down"></i></button>

                                        <ul
                                            class="dropdown-menu animation slideDownIn"
                                            aria-labelledby="dropdownMenuButton-2"
                                        >
                                            <li>
                                                <RouterLink to="#">تومان</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">دلار</RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="pr-0">
                                    <div class="dropdown">
                                        <button
                                            type="button"
                                            id="dropdownMenuButton-3"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="/assets/images/flag/1.jpg"
                                                alt=""
                                            /> فارسی <i class="ion-ios-arrow-down"></i>
                                        </button>

                                        <ul
                                            class="dropdown-menu animation slideDownIn"
                                            aria-labelledby="dropdownMenuButton-3"
                                        >
                                            <li>
                                                <RouterLink to="#"><img
                                                        src="/assets/images/flag/1.jpg"
                                                        alt=""
                                                    /> فارسی</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#"><img
                                                        src="/assets/images/flag/2.jpg"
                                                        alt=""
                                                    /> انگلیسی</RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Header Nav End -->
            <div class="header-top bg-white ptb-30px d-xl-block d-none">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="logo">
                                <RouterLink to="/"><img
                                        class="img-responsive"
                                        src="/assets/images/logo/logo.png"
                                        alt="logo.jpg"
                                    /></RouterLink>
                            </div>
                        </div>
                        <div class="col-md-10 align-self-center">
                            <div class="header-right-element d-flex">
                                <div class="search-element media-body">
                                    <form
                                        class="d-flex"
                                        action="#"
                                    >
                                        <div class="search-category">
                                            <select>
                                                <option value="0">دسته بندی ها</option>
                                                <option value="12">لپ تاپ</option>
                                                <option value="13">- - عنوان شماره یک</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="14">- - عنوان شماره دو</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="15">- - عنوان شماره سه</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره چهار</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره پنج</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره شش</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="49">کامپیوتر</option>
                                                <option value="13">- - عنوان شماره یک</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره دو</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره سه</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="68">تلفن همراه</option>
                                                <option value="13">- - عنوان شماره یک</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره دو</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره سه</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره چهار</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره پنج</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="13">- - عنوان شماره شش</option>
                                                <option value="19">- - - - زیر عنوان 1</option>
                                                <option value="20">- - - - زیر عنوان 2</option>
                                                <option value="21">- - - - زیر عنوان 3</option>
                                                <option value="22">- - - - زیر عنوان 4</option>
                                                <option value="23">- - - - زیر عنوان 5</option>
                                                <option value="104">کنسول بازی</option>
                                                <option value="105">پخش کننده موسیقی</option>
                                                <option value="106">تلویزیون</option>
                                                <option value="107">ساعت</option>
                                                <option value="108">لوازم جانبی</option>
                                                <option value="109">دوربین</option>
                                                <option value="110">لوازم خانه</option>
                                            </select>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="جستجو ... "
                                        />
                                        <button><i class="icon-magnifier"></i></button>
                                    </form>
                                </div>
                                <div class="contact-link">
                                    <div class="phone tm-ltr">
                                        <p class="tm-rtl">تلفن ما :</p>
                                        <a
                                            class="tm-ltr"
                                            href="tel:02100000000"
                                        >021 0000 0000</a>
                                    </div>
                                </div>
                                <!--Cart info Start -->
                                <div class="header-tools d-flex">
                                    <div class="cart-info d-flex align-self-center">
                                        <RouterLink
                                            to="/compare"
                                            class="shuffle"
                                            data-number="3"
                                        ><i class="icon-shuffle"></i></RouterLink>
                                        <a
                                            href="#offcanvas-wishlist"
                                            class="heart offcanvas-toggle"
                                            data-number="3"
                                        ><i class="icon-heart"></i></a>
                                        <a
                                            href="#offcanvas-cart"
                                            class="bag offcanvas-toggle"
                                            data-number="3"
                                        ><span>200.000 تومان</span><i
                                                class="icon-bag"
                                                style="float: right; margin-top: 5px;"
                                            ></i></a>
                                    </div>
                                </div>
                            </div>
                            <!--Cart info End -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Header Nav End -->
            <div class="header-menu bg-blue sticky-nav d-xl-block d-none padding-0px">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 custom-col-2">
                            <div class="header-menu-vertical">
                                <h4 class="menu-title">دسته بندی ها</h4>
                                <ul class="menu-content display-none">
                                    <li class="menu-item">
                                        <RouterLink to="#">لوازم الکترونیکی <i
                                                class="ion-ios-arrow-left"
                                            ></i></RouterLink>
                                        <ul class="sub-menu flex-wrap">
                                            <li>
                                                <RouterLink to="#">
                                                    <span> <strong>عنوان شماره
                                                            یک</strong></span>
                                                </RouterLink>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <RouterLink to="#">
                                                    <span><strong>عنوان شماره دو</strong></span>
                                                </RouterLink>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <RouterLink to="#">
                                                    <span><strong>عنوان شماره سه</strong></span>
                                                </RouterLink>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <RouterLink to="#">
                                                    <span><strong>عنوان شماره
                                                            چهار</strong></span>
                                                </RouterLink>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <RouterLink to="#">
                                                    <span><strong>عنوان شماره
                                                            پنج</strong></span>
                                                </RouterLink>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <img
                                                    src="/assets/images/menu-image/banner-mega1.jpg"
                                                    alt=""
                                                />
                                            </li>
                                        </ul>
                                        <!-- sub menu -->
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">بازی <i class="ion-ios-arrow-left"></i>
                                        </RouterLink>
                                        <ul class="sub-menu sub-menu-2">
                                            <li>
                                                <ul class="submenu-item">
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر عنوان 4</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <!-- sub menu -->
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">تلویزیون</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">دوربین دیجیتال</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">هدفون</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">لوازم جانبی</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">ساعت هوشمند</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">کنسول بازی</RouterLink>
                                    </li>
                                    <li class="menu-item">
                                        <RouterLink to="#">لوازم خانگی</RouterLink>
                                    </li>
                                </ul>
                                <!-- menu content -->
                            </div>
                            <!-- header menu vertical -->
                        </div>
                        <div class="col-lg-9 custom-col-2">
                            <div class="header-horizontal-menu">
                                <ul class="menu-content">
                                    <li class="active menu-dropdown">
                                        <RouterLink to="#">صفحه اصلی<i
                                                class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <ul class="main-sub-menu">
                                            <li>
                                                <RouterLink to="/">صفحه اصلی 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/home-2">صفحه اصلی 2
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/home-3">صفحه اصلی 3
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/home-4">صفحه اصلی 4
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-dropdown">
                                        <RouterLink to="#">خرید<i class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <ul class="mega-menu-wrap">
                                            <li>
                                                <ul>
                                                    <li class="mega-menu-title">
                                                        <RouterLink to="#">صفحات فروشگاه</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/3-column">فروشگاه
                                                            (سه ستونه)</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/4-column">فروشگاه
                                                            (چهار ستونه)</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/left-sidebar">
                                                            فروشگاه (با نوار کناری چپ)
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/right-sidebar">
                                                            فروشگاه (با نوار کناری راست)
                                                        </RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li class="mega-menu-title">
                                                        <RouterLink to="#">صفحات فروشگاه</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/list">فروشگاه
                                                            (لیست)</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/list-left-sidebar">
                                                            فروشگاه
                                                            (لیست با نوار کناری چپ)</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/shop/list-right-sidebar">
                                                            فروشگاه (لیست با نوار کناری راست)
                                                        </RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li class="mega-menu-title">
                                                        <RouterLink to="#">صفحات محصول</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product">ساده
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/variable">با
                                                            متغییر</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/affiliate">
                                                            وابسته</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/group">گروه
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/tabstyle-2">
                                                            برگه خرید 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/tabstyle-3">
                                                            برگه خرید 3</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul>
                                                    <li class="mega-menu-title">
                                                        <RouterLink to="#">صفحات محصول</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/slider">اسلایدر
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/gallery-left">
                                                            گالری سمت چپ</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/gallery-right">
                                                            گالری سمت راست</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/sticky-left">
                                                            گالری ستونی چپ</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/product/sticky-right">
                                                            گالری ستونی راست</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="w-100">
                                                <ul class="banner-megamenu-wrapper d-flex">
                                                    <li class="banner-wrapper mr-30px">
                                                        <RouterLink to="/product"><img
                                                                src="/assets/images/menu-image/banner-menu2.jpg"
                                                                alt=""
                                                            /></RouterLink>
                                                    </li>
                                                    <li class="banner-wrapper">
                                                        <RouterLink to="/product"><img
                                                                src="/assets/images/menu-image/banner-menu3.jpg"
                                                                alt=""
                                                            /></RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-dropdown">
                                        <RouterLink to="#">سایر صفحات<i
                                                class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <ul class="main-sub-menu">
                                            <li>
                                                <RouterLink to="/about">درباره ما</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/cart">سبد خرید</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/checkout">تسویه حساب
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/compare">مقایسه محصولات
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/login">ورود و ثبت نام
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/my-account">حساب من
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/wishlist">علاقه مندی ها
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="/thank-you">ثبت سفارش موفق
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-dropdown">
                                        <RouterLink to="#">وبلاگ<i class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <ul class="main-sub-menu">
                                            <li class="menu-dropdown position-static">
                                                <RouterLink to="#">وبلاگ (شبکه ای) <i
                                                        class="ion-ios-arrow-left"
                                                    ></i></RouterLink>
                                                <ul class="main-sub-menu main-sub-menu-2">
                                                    <li>
                                                        <RouterLink to="/blog/grid-left-sidebar">
                                                            شبکه ای - نوار کناری چپ
                                                        </RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/blog/grid-right-sidebar">
                                                            شبکه ای - نوار کناری راست
                                                        </RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="menu-dropdown position-static">
                                                <RouterLink to="#">وبلاگ (لیست) <i
                                                        class="ion-ios-arrow-left"
                                                    ></i></RouterLink>
                                                <ul class="main-sub-menu main-sub-menu-2">
                                                    <li>
                                                        <RouterLink to="/blog/list-left-sidebar">
                                                            لیست - نوار کناری چپ</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/blog/list-right-sidebar">
                                                            لیست - نوار کناری راست</RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="menu-dropdown position-static">
                                                <RouterLink to="#">تک پست <i
                                                        class="ion-ios-arrow-left"
                                                    ></i>
                                                </RouterLink>
                                                <ul class="main-sub-menu main-sub-menu-2">
                                                    <li>
                                                        <RouterLink to="/blog/single-left-sidebar">
                                                            تک پست (نوار کناری چپ)</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="/blog/single-right-sidebar">
                                                            تک پست (نوار کناری راست)
                                                        </RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <RouterLink to="/contact">ارتباط با ما</RouterLink>
                                    </li>
                                </ul>
                            </div>
                            <!-- header horizontal menu -->
                            <div class="intro-text-shipping text-end">
                                <div class="free-ship">ارسال رایگان برای خرید های بالای 500.000
                                    تومان</div>
                            </div>
                        </div>
                    </div>
                    <!-- row -->
                </div>
                <!-- container -->
            </div>
            <!-- header menu -->
        </header>
        <!-- Header Section End Here -->
        <div class="mobile-header d-xl-none sticky-nav bg-white ptb-10px">
            <div class="container">
                <div class="row align-items-center">

                    <!-- Header Logo Start -->
                    <div class="col">
                        <div class="header-logo">
                            <RouterLink to="/"><img
                                    class="img-responsive"
                                    src="/assets/images/logo/logo.png"
                                    alt="logo.jpg"
                                /></RouterLink>
                        </div>
                    </div>
                    <!-- Header Logo End -->

                    <!-- Header Tools Start -->
                    <div class="col-auto">
                        <div class="header-tools justify-content-end">
                            <div class="cart-info d-flex align-self-center">
                                <RouterLink
                                    to="/compare"
                                    class="shuffle d-xs-none"
                                    data-number="3"
                                ><i class="icon-shuffle"></i></RouterLink>
                                <a
                                    href="#offcanvas-wishlist"
                                    class="heart offcanvas-toggle d-xs-none"
                                    data-number="3"
                                ><i class="icon-heart"></i></a>
                                <a
                                    href="#offcanvas-cart"
                                    class="bag offcanvas-toggle"
                                    data-number="3"
                                ><span>200.000 تومان</span><i
                                        class="icon-bag"
                                        style="float: right; margin-top: 8px;"
                                    ></i></a>
                            </div>
                            <div class="mobile-menu-toggle">
                                <a
                                    href="#offcanvas-mobile-menu"
                                    class="offcanvas-toggle"
                                >
                                    <svg viewBox="0 0 800 600">
                                        <path
                                            d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                                            id="top"
                                        ></path>
                                        <path
                                            d="M300,320 L540,320"
                                            id="middle"
                                        ></path>
                                        <path
                                            d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                            id="bottom"
                                            transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Header Tools End -->

                </div>
            </div>
        </div>

        <!-- Search Category Start -->
        <div class="mobile-search-area d-xl-none mb-15px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="search-element media-body">
                            <form
                                class="d-flex"
                                action="#"
                            >
                                <div class="search-category">
                                    <select>
                                        <option value="0">دسته بندی ها</option>
                                        <option value="12">لپ تاپ</option>
                                        <option value="13">- - عنوان شماره یک</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="14">- - عنوان شماره دو</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="15">- - عنوان شماره سه</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره چهار</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره پنج</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره شش</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="49">کامپیوتر</option>
                                        <option value="13">- - عنوان شماره یک</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره دو</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره سه</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="68">تلفن همراه</option>
                                        <option value="13">- - عنوان شماره یک</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره دو</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره سه</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره چهار</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره پنج</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="13">- - عنوان شماره شش</option>
                                        <option value="19">- - - - زیر عنوان 1</option>
                                        <option value="20">- - - - زیر عنوان 2</option>
                                        <option value="21">- - - - زیر عنوان 3</option>
                                        <option value="22">- - - - زیر عنوان 4</option>
                                        <option value="23">- - - - زیر عنوان 5</option>
                                        <option value="104">کنسول بازی</option>
                                        <option value="105">پخش کننده موسیقی</option>
                                        <option value="106">تلویزیون</option>
                                        <option value="107">ساعت</option>
                                        <option value="108">لوازم جانبی</option>
                                        <option value="109">دوربین</option>
                                        <option value="110">لوازم خانه</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    placeholder="جستجو ... "
                                />
                                <button><i class="icon-magnifier"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Search Category End -->
        <div class="mobile-category-nav d-xl-none mb-15px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">

                        <!--=======  category menu  =======-->
                        <div class="hero-side-category">
                            <!-- Category Toggle Wrap -->
                            <div class="category-toggle-wrap">
                                <!-- Category Toggle -->
                                <button class="category-toggle"><i class="fa fa-bars"></i> دسته بندی
                                    ها</button>
                            </div>

                            <!-- Category Menu -->
                            <nav class="category-menu">
                                <ul>
                                    <li class="menu-item-has-children menu-item-has-children-1">
                                        <RouterLink to="#">لوازم جانبی<i
                                                class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-1">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 5</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children menu-item-has-children-2">
                                        <RouterLink to="#">دوربین<i class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-2">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 5</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children menu-item-has-children-3">
                                        <RouterLink to="#">لوازم الکترونیکی<i
                                                class="ion-ios-arrow-down"
                                            ></i></RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-3">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 5</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children menu-item-has-children-4">
                                        <RouterLink to="#">پخش کننده فیلم<i
                                                class="ion-ios-arrow-down"
                                            ></i>
                                        </RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-4">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 5</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children menu-item-has-children-5">
                                        <RouterLink to="#">هدفون<i class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-5">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 5</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item-has-children menu-item-has-children-6">
                                        <RouterLink to="#">بازی<i class="ion-ios-arrow-down"></i>
                                        </RouterLink>
                                        <!-- category submenu -->
                                        <ul class="category-mega-menu category-mega-menu-6">
                                            <li>
                                                <RouterLink to="#">زیر عنوان 1</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 2</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 3</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to="#">زیر عنوان 4</RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <RouterLink to="#">تلویزیون</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">دوربین دیجیتال</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">ساعت هوشمند</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">لوازم جانبی موبایل</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">لپ تاپ</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">کنسول بازی</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">دسته بازی</RouterLink>
                                    </li>
                                    <li class="hidden">
                                        <RouterLink to="#">ماوس و کیبورد</RouterLink>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            id="more-btn"
                                        ><i
                                                class="ion-ios-plus-empty"
                                                aria-hidden="true"
                                            ></i> بیشتر</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <!--=======  End of category menu =======-->
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile Header Section End -->
        <!-- OffCanvas Wishlist Start -->
        <div
            id="offcanvas-wishlist"
            class="offcanvas offcanvas-wishlist"
        >
            <div class="inner">
                <div class="head">
                    <span class="title">علاقه مندی ها</span>
                    <button class="offcanvas-close">×</button>
                </div>
                <div class="body customScroll">
                    <ul class="minicart-product-list">
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/1.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/2.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/3.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="foot">
                    <div class="buttons">
                        <RouterLink
                            to="/wishlist"
                            class="btn btn-dark btn-hover-primary mt-30px"
                        >مشاهده لیست علاقه مندی ها</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- OffCanvas Wishlist End -->

        <!-- OffCanvas Cart Start -->
        <div
            id="offcanvas-cart"
            class="offcanvas offcanvas-cart"
        >
            <div class="inner">
                <div class="head">
                    <span class="title">سبد خرید</span>
                    <button class="offcanvas-close">×</button>
                </div>
                <div class="body customScroll">
                    <ul class="minicart-product-list">
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/1.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/2.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                        <li>
                            <RouterLink
                                to="/product"
                                class="image"
                            ><img
                                    src="/assets/images/product-image/3.jpg"
                                    alt="Cart product Image"
                                ></RouterLink>
                            <div class="content">
                                <RouterLink
                                    to="/product"
                                    class="title"
                                >عنوان محصول</RouterLink>
                                <span class="quantity-price">1 x <span class="amount tm1">50.000
                                        تومان</span></span>
                                <a
                                    href="#"
                                    class="remove"
                                >×</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="foot">
                    <div class="sub-total">
                        <strong>جمع :</strong>
                        <span class="amount">200.000 تومان</span>
                    </div>
                    <div class="buttons">
                        <RouterLink
                            to="/cart"
                            class="btn btn-dark btn-hover-primary mb-30px"
                        >مشاهده سبد خرید</RouterLink>
                        <RouterLink
                            to="/checkout"
                            class="btn btn-outline-dark current-btn"
                        >تسویه حساب</RouterLink>
                    </div>
                    <p class="minicart-message">ارسال رایگان برای سفارشات بالای 500.000 تومان!</p>
                </div>
            </div>
        </div>
        <!-- OffCanvas Cart End -->

        <!-- OffCanvas Search Start -->
        <div
            id="offcanvas-mobile-menu"
            class="offcanvas offcanvas-mobile-menu"
        >
            <div class="inner customScroll">
                <div class="head">
                    <span class="title">&nbsp;</span>
                    <button class="offcanvas-close">×</button>
                </div>
                <div class="offcanvas-menu-search-form">
                    <form action="#">
                        <input
                            type="text"
                            placeholder="جستجو..."
                        >
                        <button><i class="icon-magnifier"></i></button>
                    </form>
                </div>
                <div class="offcanvas-menu">
                    <ul>
                        <li>
                            <RouterLink to="#"><span class="menu-text">صفحه اصلی</span></RouterLink>
                            <ul class="sub-menu">
                                <li>
                                    <RouterLink to="/"><span class="menu-text">صفحه اصلی
                                            1</span></RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/home-2"><span class="menu-text">صفحه اصلی
                                            2</span></RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/home-3"><span class="menu-text">صفحه اصلی
                                            3</span></RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/home-4"><span class="menu-text">صفحه اصلی
                                            4</span></RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink to="#"><span class="menu-text">خرید</span></RouterLink>
                            <ul class="sub-menu">
                                <li>
                                    <RouterLink to="#"><span class="menu-text">صفحات فروشگاه - شبکه
                                            ای</span></RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/shop/3-column">فروشگاه (سه
                                                ستونه)</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/shop/4-column">فروشگاه (چهار
                                                ستونه)</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/shop/left-sidebar">فروشگاه (با
                                                نوار کناری چپ)</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/shop/right-sidebar">فروشگاه (با
                                                نوار کناری راست)</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink to="#"><span class="menu-text">صفحات فروشگاه -
                                            لیست</span></RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/shop/list">فروشگاه (لیست)
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/shop/list-left-sidebar">فروشگاه
                                                (لیست با نوار کناری چپ)</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/shop/list-right-sidebar">
                                                فروشگاه (لیست با نوار کناری راست)
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink to="#"><span class="menu-text">صفحات محصول - دسته
                                            1</span></RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/product">ساده</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/variable">با متغییر
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/affiliate">وابسته
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/group">گروه
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/tabstyle-2">برگه خرید 2
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/tabstyle-3">برگه خرید 3
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink to="#"><span class="menu-text">صفحات محصول - دسته
                                            2</span></RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/product/slider">اسلایدر
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/gallery-left">گالری سمت
                                                چپ</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/gallery-right">گالری
                                                سمت راست</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/sticky-left">گالری
                                                ستونی چپ</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/product/sticky-right">گالری
                                                ستونی راست</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink to="#"><span class="menu-text">سایر صفحات</span>
                            </RouterLink>
                            <ul class="sub-menu">
                                <li>
                                    <RouterLink to="/about">درباره ما</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/cart">سبد خرید</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/checkout">تسویه حساب</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/compare">مقایسه محصولات</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/login">ورود و ثبت نام</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/my-account">حساب من</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/wishlist">علاقه مندی ها</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/thank-you">ثبت سفارش موفق</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink to="#"><span class="menu-text">وبلاگ</span></RouterLink>
                            <ul class="sub-menu">
                                <li>
                                    <RouterLink to="#"><span class="menu-text">وبلاگ (شبکه
                                            ای)</span>
                                    </RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/blog/grid-left-sidebar">شبکه ای
                                                - نوار کناری چپ</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/blog/grid-right-sidebar">شبکه
                                                ای - نوار کناری راست</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink to="#"><span class="menu-text">وبلاگ (لیست)</span>
                                    </RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/blog/list-left-sidebar">لیست -
                                                نوار کناری چپ</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/blog/list-right-sidebar">لیست -
                                                نوار کناری راست</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink to="#"><span class="menu-text">تک پست</span>
                                    </RouterLink>
                                    <ul class="sub-menu">
                                        <li>
                                            <RouterLink to="/blog/single-left-sidebar">تک
                                                پست (نوار کناری چپ)</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/blog/single-right-sidebar">تک
                                                پست (نوار کناری راست)</RouterLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink to="/contact">ارتباط با ما</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="offcanvas-buttons mt-30px">
                    <div class="header-tools d-flex">
                        <div class="cart-info d-flex align-self-center">
                            <RouterLink
                                to="/my-account"
                                class="user"
                            ><i class="icon-user"></i></RouterLink>
                            <RouterLink
                                to="/wishlist"
                                data-number="3"
                            ><i class="icon-heart"></i></RouterLink>
                            <RouterLink
                                to="/cart"
                                data-number="3"
                            ><i class="icon-bag"></i></RouterLink>
                        </div>
                    </div>
                </div>
                <div class="offcanvas-social mt-30px">
                    <ul>
                        <li>
                            <RouterLink to="#"><i class="icon-social-facebook"></i></RouterLink>
                        </li>
                        <li>
                            <RouterLink to="#"><i class="icon-social-twitter"></i></RouterLink>
                        </li>
                        <li>
                            <RouterLink to="#"><i class="icon-social-instagram"></i></RouterLink>
                        </li>
                        <li>
                            <RouterLink to="#"><i class="icon-social-google"></i></RouterLink>
                        </li>
                        <li>
                            <RouterLink to="#"><i class="icon-social-instagram"></i></RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- OffCanvas Search End -->

        <div class="offcanvas-overlay">
        </div>
    </div>
</template>
