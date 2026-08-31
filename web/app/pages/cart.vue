<template>
    <div class="page-content">
        <!-- Breadcrumb Area Start -->
        <div class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="breadcrumb-content">
                            <ul class="nav">
                                <li>
                                    <RouterLink to="/">صفحه اصلی</RouterLink>
                                </li>
                                <li>سبد خرید</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- cart area start -->
        <div class="cart-main-area mtb-60px">
            <div class="container">
                <h3 class="cart-page-title">سبد خرید شما</h3>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <form action="#">
                            <div class="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>تصویر</th>
                                            <th>نام محصول</th>
                                            <th>قیمت</th>
                                            <th>تعداد</th>
                                            <th>جمع</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="product-thumbnail">
                                                <RouterLink to="#"><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/2-1.jpg"
                                                        alt=""
                                                    /></RouterLink>
                                            </td>
                                            <td class="product-name">
                                                <RouterLink to="#">عنوان محصول
                                                </RouterLink>
                                            </td>
                                            <td class="product-price-cart"><span
                                                    class="amount">50.000 تومان</span></td>
                                            <td class="product-quantity">
                                                <div class="cart-plus-minus">
                                                    <input
                                                        class="cart-plus-minus-box"
                                                        type="text"
                                                        name="qtybutton"
                                                        value="1"
                                                    />
                                                </div>
                                            </td>
                                            <td class="product-subtotal">50.000 تومان</td>
                                            <td class="product-remove">
                                                <RouterLink to="#"><i class="icon-pencil"></i>
                                                </RouterLink>
                                                <RouterLink to="#"><i class="icon-close"></i>
                                                </RouterLink>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="product-thumbnail">
                                                <RouterLink to="#"><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/2-2.jpg"
                                                        alt=""
                                                    /></RouterLink>
                                            </td>
                                            <td class="product-name">
                                                <RouterLink to="#">عنوان محصول
                                                </RouterLink>
                                            </td>
                                            <td class="product-price-cart"><span
                                                    class="amount">50.000 تومان</span></td>
                                            <td class="product-quantity">
                                                <div class="cart-plus-minus">
                                                    <input
                                                        class="cart-plus-minus-box"
                                                        type="text"
                                                        name="qtybutton"
                                                        value="1"
                                                    />
                                                </div>
                                            </td>
                                            <td class="product-subtotal">50.000 تومان</td>
                                            <td class="product-remove">
                                                <RouterLink to="#"><i class="icon-pencil"></i>
                                                </RouterLink>
                                                <RouterLink to="#"><i class="icon-close"></i>
                                                </RouterLink>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="product-thumbnail">
                                                <RouterLink to="#"><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/2-3.jpg"
                                                        alt=""
                                                    /></RouterLink>
                                            </td>
                                            <td class="product-name">
                                                <RouterLink to="#">عنوان محصول
                                                </RouterLink>
                                            </td>
                                            <td class="product-price-cart"><span
                                                    class="amount">50.000 تومان</span></td>
                                            <td class="product-quantity">
                                                <div class="cart-plus-minus">
                                                    <input
                                                        class="cart-plus-minus-box"
                                                        type="text"
                                                        name="qtybutton"
                                                        value="1"
                                                    />
                                                </div>
                                            </td>
                                            <td class="product-subtotal">50.000 تومان</td>
                                            <td class="product-remove">
                                                <RouterLink to="#"><i class="icon-pencil"></i>
                                                </RouterLink>
                                                <RouterLink to="#"><i class="icon-close"></i>
                                                </RouterLink>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="cart-shiping-update-wrapper">
                                        <div class="cart-shiping-update">
                                            <RouterLink to="#">به خرید ادامه دهید</RouterLink>
                                        </div>
                                        <div class="cart-clear">
                                            <button>بروزرسانی سبد خرید</button>
                                            <RouterLink to="#">پاک کردن سبد خرید</RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 mb-lm-30px">
                                <div class="cart-tax">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">محاسبه هزینه
                                            ارسال و مالیات</h4>
                                    </div>
                                    <div class="tax-wrapper">
                                        <p>کشور و استان خود را جهت تخمین قیمت ارسال و مالیات وارد
                                            کنید.</p>
                                        <div class="tax-select-wrapper">
                                            <div class="tax-select">
                                                <label>
                                                    * کشور
                                                </label>
                                                <select class="email s-email s-wid">
                                                    <option>ایران</option>
                                                    <option>قطر</option>
                                                    <option>امارات</option>
                                                    <option>عراق</option>
                                                    <option>ارمنستان</option>
                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * استان / ایالت
                                                </label>
                                                <select class="email s-email s-wid">
                                                    <option>استان یک</option>
                                                    <option>استان دو</option>
                                                    <option>استان سه</option>
                                                    <option>استان چهار</option>
                                                    <option>استان پنج</option>
                                                </select>
                                            </div>
                                            <div class="tax-select mb-25px">
                                                <label>
                                                    * کد پستی
                                                </label>
                                                <input type="text" />
                                            </div>
                                            <button
                                                class="cart-btn-2"
                                                type="submit"
                                            >ثبت اطلاعات</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-lm-30px">
                                <div class="discount-code-wrapper">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">ثبت کد تخفیف
                                        </h4>
                                    </div>
                                    <div class="discount-code">
                                        <p>اگر کد تخفیف دارید، وارد نمایید.</p>
                                        <form>
                                            <input
                                                type="text"
                                                required=""
                                                name="name"
                                            />
                                            <button
                                                class="cart-btn-2"
                                                type="submit"
                                            >ثبت کد تخفیف</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12 mt-md-30px">
                                <div class="grand-totall">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">مجموع سبد
                                            خرید</h4>
                                    </div>
                                    <h5>جمع محصولات <span>150.000 تومان</span></h5>
                                    <div class="total-shipping">
                                        <h5>انتخاب نوع ارسال</h5>
                                        <ul>
                                            <li><input type="checkbox" /> پست پیشتاز <span>30.000
                                                    تومان</span></li>
                                            <li><input type="checkbox" /> پست سفارشی <span>20.000
                                                    تومان</span></li>
                                        </ul>
                                    </div>
                                    <h4 class="grand-totall-title">جمع نهایی <span>150.000
                                            تومان</span></h4>
                                    <RouterLink to="#">تسویه حساب</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- cart area end -->
    </div>
</template>
