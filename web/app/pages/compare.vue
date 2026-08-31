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
                                <li>مقایسه محصولات</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- Compare area start -->
        <div class="compare-area mtb-60px">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="#">
                            <!-- Compare Table -->
                            <div class="compare-table table-responsive">
                                <table class="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="first-column">محصول</td>
                                            <td class="product-image-title">
                                                <a
                                                    href="#"
                                                    class="image"
                                                ><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/19.jpg"
                                                        alt="Compare Product"
                                                    /></a>
                                                    <a
                                                        href="#"
                                                        class="category"
                                                    >دسته محصول</a>
                                                        <a
                                                            href="#"
                                                            class="title"
                                                        >عنوان محصول یک</a>
                                            </td>
                                            <td class="product-image-title">
                                                <a
                                                    href="#"
                                                    class="image"
                                                ><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/24.jpg"
                                                        alt="Compare Product"
                                                    /></a>
                                                    <a
                                                        href="#"
                                                        class="category"
                                                    >دسته محصول</a>
                                                        <a
                                                            href="#"
                                                            class="title"
                                                        >عنوان محصول دو</a>
                                            </td>
                                            <td class="product-image-title">
                                                <a
                                                    href="#"
                                                    class="image"
                                                ><img
                                                        class="img-responsive"
                                                        src="/assets/images/product-image/10.jpg"
                                                        alt="Compare Product"
                                                    /></a>
                                                    <a
                                                        href="#"
                                                        class="category"
                                                    >دسته محصول</a>
                                                        <a
                                                            href="#"
                                                            class="title"
                                                        >عنوان محصول سه</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">جزئیات</td>
                                            <td class="pro-desc">
                                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                                    صنعت چاپ و با استفاده از طراحان گرافیک است
                                                    چاپگرها و متون بلکه روزنامه و مجله که لازم است.
                                                </p>
                                            </td>
                                            <td class="pro-desc">
                                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                                    صنعت چاپ و با استفاده از طراحان گرافیک است
                                                    چاپگرها و متون بلکه روزنامه و مجله که لازم است.
                                                </p>
                                            </td>
                                            <td class="pro-desc">
                                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                                    صنعت چاپ و با استفاده از طراحان گرافیک است
                                                    چاپگرها و متون بلکه روزنامه و مجله که لازم است.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">قیمت</td>
                                            <td class="pro-price">500.000 تومان</td>
                                            <td class="pro-price">449.000 تومان</td>
                                            <td class="pro-price">399.000 تومان</td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">رنگ</td>
                                            <td class="pro-color">سفید</td>
                                            <td class="pro-color">سفید</td>
                                            <td class="pro-color">سفید</td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">موجودی</td>
                                            <td class="pro-stock">موجود در انبار</td>
                                            <td class="pro-stock">موجود در انبار</td>
                                            <td class="pro-stock">موجود در انبار</td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">افزودن به سبد خرید</td>
                                            <td class="pro-addtocart">
                                                <a
                                                    href="#"
                                                    class="add-to-cart"
                                                    tabindex="0"
                                                ><span>افزودن به سبد خرید</span></a>
                                            </td>
                                            <td class="pro-addtocart">
                                                <a
                                                    href="#"
                                                    class="add-to-cart"
                                                    tabindex="0"
                                                ><span>افزودن به سبد خرید</span></a>
                                            </td>
                                            <td class="pro-addtocart">
                                                <a
                                                    href="#"
                                                    class="add-to-cart"
                                                    tabindex="0"
                                                ><span>افزودن به سبد خرید</span></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">حذف</td>
                                            <td class="pro-remove">
                                                <button><i class="ion-trash-b"></i></button>
                                            </td>
                                            <td class="pro-remove">
                                                <button><i class="ion-trash-b"></i></button>
                                            </td>
                                            <td class="pro-remove">
                                                <button><i class="ion-trash-b"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">امتیاز</td>
                                            <td class="pro-ratting">
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                            </td>
                                            <td class="pro-ratting">
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star-outline"></i>
                                            </td>
                                            <td class="pro-ratting">
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star"></i>
                                                <i class="ion-android-star-half"></i>
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
        <!-- Compare area end -->
    </div>
</template>
