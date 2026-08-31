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
                                <li>علاقه مندی ها</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- Wishlist area start -->
        <div class="cart-main-area mtb-60px">
            <div class="container">
                <h3 class="cart-page-title">لیست علاقه مندی ها</h3>
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
                                            <th>افزودن به سبد خرید</th>
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
                                            <td class="product-wishlist-cart">
                                                <RouterLink to="#">افزودن به سبد خرید</RouterLink>
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
                                            <td class="product-wishlist-cart">
                                                <RouterLink to="#">افزودن به سبد خرید</RouterLink>
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
                                            <td class="product-wishlist-cart">
                                                <RouterLink to="#">افزودن به سبد خرید</RouterLink>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Wishlist area end -->
    </div>
</template>
