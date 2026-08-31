<template>
    <div class="page-content">
        <!-- Slider Start -->
        <div class="slider-area slider-height-1">
            <div class="hero-slider swiper-container">
                <div class="swiper-wrapper">
                    <!-- Single Slider  -->
                    <div
                        class="swiper-slide bg-img d-flex"
                        style="background-image: url(/assets/images/slider-image/sample-2.jpg);"
                    >
                        <div class="container align-self-center">
                            <div class="slider-content-1 slider-animated-1 text-start pl-60px">
                                <span class="animated color-gray">محصول جدید</span>
                                <h1 class="animated color-black">
                                    عنوان محصول فروشگاه <br />
                                    <strong>جزئیات محصول</strong>
                                </h1>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="shop-btn animated"
                                >اکنون خرید کنید</RouterLink>
                            </div>
                        </div>
                    </div>
                    <!-- Single Slider  -->
                    <div
                        class="swiper-slide bg-img d-flex"
                        style="background-image: url(/assets/images/slider-image/sample-1.jpg);"
                    >
                        <div class="container align-self-center">
                            <div class="slider-content-1 slider-animated-1 text-start pl-60px">
                                <span class="animated color-gray">محصول جدید</span>
                                <h1 class="animated color-black">
                                    عنوان محصول فروشگاه <br />
                                    <strong>جزئیات محصول</strong>
                                </h1>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="shop-btn animated"
                                >اکنون خرید کنید</RouterLink>
                            </div>
                        </div>
                    </div>
                    <!-- Single Slider  -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination swiper-pagination-white"></div>
            </div>
        </div>
        <!-- Slider End -->
        <!-- Static Area Start -->
        <div class="static-area mtb-60px">
            <div class="container">
                <div class="static-area-wrap">
                    <div class="row">
                        <!-- Static Single Item Start -->
                        <div class="col-lg-3 col-xs-12 col-md-6 col-sm-6 mb-md-30px mb-lm-30px">
                            <div class="single-static">
                                <img
                                    src="/assets/images/icons/static-icons-1.png"
                                    alt=""
                                    class="img-responsive"
                                />
                                <div class="single-static-meta">
                                    <h4>ارسال رایگان</h4>
                                    <p>لورم ایپسوم متن ساختگی با سادگی</p>
                                </div>
                            </div>
                        </div>
                        <!-- Static Single Item End -->
                        <!-- Static Single Item Start -->
                        <div class="col-lg-3 col-xs-12 col-md-6 col-sm-6 mb-md-30px mb-lm-30px">
                            <div class="single-static">
                                <img
                                    src="/assets/images/icons/static-icons-2.png"
                                    alt=""
                                    class="img-responsive"
                                />
                                <div class="single-static-meta">
                                    <h4>ضمانت مرجوعی</h4>
                                    <p>لورم ایپسوم متن ساختگی با سادگی</p>
                                </div>
                            </div>
                        </div>
                        <!-- Static Single Item End -->
                        <!-- Static Single Item Start -->
                        <div class="col-lg-3 col-xs-12 col-md-6 col-sm-6 mb-sm-30px">
                            <div class="single-static">
                                <img
                                    src="/assets/images/icons/static-icons-4.png"
                                    alt=""
                                    class="img-responsive"
                                />
                                <div class="single-static-meta">
                                    <h4>پرداخت امن</h4>
                                    <p>لورم ایپسوم متن ساختگی با سادگی</p>
                                </div>
                            </div>
                        </div>
                        <!-- Static Single Item End -->
                        <!-- Static Single Item Start -->
                        <div class="col-lg-3 col-xs-12 col-md-6 col-sm-6">
                            <div class="single-static">
                                <img
                                    src="/assets/images/icons/static-icons-3.png"
                                    alt=""
                                    class="img-responsive"
                                />
                                <div class="single-static-meta">
                                    <h4>پشتیبانی سریع</h4>
                                    <p>لورم ایپسوم متن ساختگی با سادگی</p>
                                </div>
                            </div>
                        </div>
                        <!-- Static Single Item End -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Static Area End -->
        <!-- Banner Area Start -->
        <div class="banner-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-xs-12">
                        <div class="banner-wrapper">
                            <RouterLink to="/shop/4-column"><img
                                    src="/assets/images/banner-image/1.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                    <div class="col-md-4 col-xs-12">
                        <div class="banner-wrapper">
                            <RouterLink to="/shop/4-column"><img
                                    src="/assets/images/banner-image/2.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                    <div class="col-md-4 col-xs-12">
                        <div class="banner-wrapper">
                            <RouterLink to="/shop/4-column"><img
                                    src="/assets/images/banner-image/3.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Banner Area End -->
        <!-- category Area Start -->
        <div class="popular-categories-area mt-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">دسته بندی های محبوب</h2>
                        </div>
                    </div>
                </div>
                <div class="category-slider slider-nav-style-1">
                    <div class="category-slider-wrapper swiper-wrapper">
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/1.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/2.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/3.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/4.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/5.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                        <div class="category-slider-item swiper-slide">
                            <div class="thumb-category">
                                <RouterLink to="/product">
                                    <img
                                        src="/assets/images/product-image/1.jpg"
                                        alt="product-image.jpg"
                                    />
                                </RouterLink>
                            </div>
                            <div class="category-discript">
                                <h4>عنوان دسته</h4>
                                <ul>
                                    <li>
                                        <RouterLink to="#">زیر دسته یک</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته دو</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته سه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="#">زیر دسته چهار</RouterLink>
                                    </li>
                                </ul>
                                <RouterLink
                                    to="/shop/4-column"
                                    class="view-all-btn"
                                >مشاهده همه</RouterLink>
                            </div>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-buttons">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- category Area End -->
        <!-- Feature Area start -->
        <div class="feature-area mt-60px mb-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">محصولات ویژه</h2>
                        </div>
                    </div>
                </div>
                <div class="feature-slider slider-nav-style-1">
                    <div class="feature-slider-wrapper swiper-wrapper">
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/6.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/7.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/7.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/8.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/9.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/10.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/12.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/13.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/14.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/15.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/16.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/17.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/18.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/19.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/20.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/21.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/22.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/23.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/24.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/25.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/26.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/27.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/28.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/29.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/6.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/7.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/8.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/9.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/10.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/11.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/12.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/13.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="feature-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/14.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/15.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-buttons">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Feature Area End -->
        <!-- Deal Area Start -->
        <div class="deal-area bg-light-gray pt-60px pb-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">محصولات تخفیف دار</h2>
                        </div>
                    </div>
                </div>
                <div class="deal-slider slider-nav-style-1">
                    <div class="deal-slider-wrapper swiper-wrapper">
                        <!-- Single Item -->
                        <div class="deal-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/29.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/17.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                        <div class="availability-list in-stock">وضعیت : <span>موجود
                                                در انبار</span></div>
                                        <div class="clockdiv">
                                            <div data-countdown="2021/12/31"></div>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="deal-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/21.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/23.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                        <div class="availability-list in-stock">وضعیت : <span>موجود
                                                در انبار</span></div>
                                        <div class="clockdiv">
                                            <div data-countdown="2021/12/31"></div>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="deal-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/9.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/28.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                        <div class="availability-list in-stock">وضعیت : <span>موجود
                                                در انبار</span></div>
                                        <div class="clockdiv">
                                            <div data-countdown="2021/12/31"></div>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Single Item -->
                        <div class="deal-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/8.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/10.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <ul class="product-flag">
                                    <li class="new">جدید</li>
                                </ul>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                        <div class="availability-list in-stock">وضعیت : <span>موجود
                                                در انبار</span></div>
                                        <div class="clockdiv">
                                            <div data-countdown="2021/12/31"></div>
                                        </div>
                                </div>
                                <div class="add-to-link">
                                    <ul>
                                        <li class="cart"><a
                                                class="cart-btn"
                                                href="#"
                                            >خرید</a>
                                        </li>
                                        <li>
                                            <RouterLink to="/wishlist"><i class="icon-heart"></i>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i class="icon-shuffle"></i>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-buttons">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
            <!-- Banner Area Start -->
            <div class="banner-area mt-30px">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="banner-wrapper">
                                <RouterLink to="/shop/4-column"><img
                                        src="/assets/images/banner-image/4.jpg"
                                        alt=""
                                    /></RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Banner Area End -->
        </div>
        <!-- Deal Area End -->
        <!-- Category Tab Area Start -->
        <section class="category-tab-area mt-60px mb-40px">
            <div class="container">
                <div class="section-title d-flex">
                    <h2>صوتی و تصویری</h2>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs sub-category d-flex justify-content-end flex-grow-1">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                data-bs-toggle="tab"
                                href="#tab-1"
                            >تلویزیون</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#tab-2"
                            >گیرنده تلویزیون</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#tab-3"
                            >بلندگو</a>
                        </li>
                    </ul>
                </div>

                <!-- Tab panes -->
                <div class="tab-content banner-area">
                    <!-- 1st tab start -->
                    <div
                        id="tab-1"
                        class="tab-pane active"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/5.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 1st tab end -->
                    <!-- 2nd tab start -->
                    <div
                        id="tab-2"
                        class="tab-pane fade"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/5.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 2nd tab end -->
                    <!-- 3rd tab start -->
                    <div
                        id="tab-3"
                        class="tab-pane fade"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/5.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 3rd tab end -->
                </div>
            </div>
        </section>
        <!-- Category Tab Area end -->
        <!-- Category Tab Area Start -->
        <section class="category-tab-area mb-40px">
            <div class="container">
                <div class="section-title d-flex">
                    <h2>دوربین</h2>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs sub-category d-flex justify-content-end flex-grow-1">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                data-bs-toggle="tab"
                                href="#tab-4"
                            >دوربین دیجیتال</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#tab-5"
                            >دوربین فیلم برداری</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#tab-6"
                            >کواد کوپتر دوربین دار</a>
                        </li>
                    </ul>
                </div>

                <!-- Tab panes -->
                <div class="tab-content banner-area">
                    <!-- 1st tab start -->
                    <div
                        id="tab-4"
                        class="tab-pane active"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/6.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 1st tab end -->
                    <!-- 2nd tab start -->
                    <div
                        id="tab-5"
                        class="tab-pane fade"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/6.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 2nd tab end -->
                    <!-- 3rd tab start -->
                    <div
                        id="tab-6"
                        class="tab-pane fade"
                    >
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 mt-lm-55px">
                                <div class="banner-wrapper">
                                    <RouterLink to="/shop/4-column"><img
                                            src="/assets/images/banner-image/6.jpg"
                                            alt=""
                                        /></RouterLink>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                                <div class="feature-slider-2 slider-nav-style-1">
                                    <div class="feature-slider-wrapper swiper-wrapper">
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price">90.000 تومان
                                                                </li>
                                                                <li class="current-price">81.000
                                                                    تومان</li>
                                                                <li class="discount-price">-10%</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/16.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/17.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/18.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/19.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/20.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/21.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/22.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/23.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/24.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/25.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/26.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/27.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/28.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/29.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/6.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/7.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/8.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/9.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/10.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/11.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/12.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/13.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <!-- Single Item -->
                                        <div class="feature-slider-item swiper-slide">
                                            <article class="list-product">
                                                <div class="img-block">
                                                    <RouterLink
                                                        to="/product"
                                                        class="thumbnail"
                                                    >
                                                        <img
                                                            class="first-img"
                                                            src="/assets/images/product-image/14.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            class="second-img"
                                                            src="/assets/images/product-image/15.jpg"
                                                            alt=""
                                                        />
                                                        </RouterLink>
                                                        <div class="quick-view">
                                                            <a
                                                                class="quick_view"
                                                                href="#"
                                                                data-link-action="quickview"
                                                                title="مشاهده سریع"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                <i class="icon-magnifier icons"></i>
                                                                </a>
                                                        </div>
                                                </div>
                                                <ul class="product-flag">
                                                    <li class="new">جدید</li>
                                                </ul>
                                                <div class="product-decs">
                                                    <RouterLink
                                                        class="inner-link"
                                                        to="/shop/4-column"
                                                    ><span>عنوان محصول</span></RouterLink>
                                                        <h2><RouterLink
                                                                to="/product"
                                                                class="product-link"
                                                            >توضیحات مربوط به محصول</RouterLink>
                                                        </h2>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                        <div class="pricing-meta">
                                                            <ul>
                                                                <li class="old-price not-cut">50.000
                                                                    تومان</li>
                                                            </ul>
                                                        </div>
                                                </div>
                                                <div class="add-to-link">
                                                    <ul>
                                                        <li class="cart"><a
                                                                title="افزودن به سبد خرید"
                                                                href="#"
                                                            ><i class="icon-bag"></i></a>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="افزودن به لیست علاقه مندی ها"
                                                                to="/wishlist"
                                                            ><i class="icon-heart"></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink
                                                                title="مقایسه محصول"
                                                                to="/compare"
                                                            ><i class="icon-shuffle"></i>
                                                                </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-buttons">
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 3rd tab end -->
                </div>
            </div>
        </section>
        <!-- Category Tab Area end -->
        <!-- Brand area start -->
        <div class="brand-area mb-60px">
            <div class="container">
                <div class="brand-slider slider-nav-style-1 slider-nav-style-2 ">
                    <div class="brand-slider-wrapper swiper-wrapper">
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/1.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/2.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/3.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/4.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/5.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/1.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                        <div class="brand-slider-item swiper-slide">
                            <RouterLink to="#"><img
                                    src="/assets/images/brand-logo/2.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-buttons">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Brand area end -->

        <!-- Recently Add area start -->
        <div class="recent-add-area mb-60px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">محصولات جدید</h2>
                        </div>
                    </div>
                </div>
                <div class="recent-slider slider-nav-style-1">
                    <div class="recent-slider-wrapper swiper-wrapper">
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/28.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/29.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/8.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/10.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/15.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/16.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/17.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/18.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/19.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/20.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/21.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/22.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price">90.000 تومان</li>
                                                <li class="current-price">81.000 تومان</li>
                                                <li class="discount-price">-10%</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/23.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/24.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/25.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/26.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/27.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/28.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/29.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/29.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/8.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/10.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                        <div class="recent-slider-item swiper-slide">
                            <article class="list-product">
                                <div class="img-block">
                                    <RouterLink
                                        to="/product"
                                        class="thumbnail"
                                    >
                                        <img
                                            class="first-img"
                                            src="/assets/images/product-image/11.jpg"
                                            alt=""
                                        />
                                        <img
                                            class="second-img"
                                            src="/assets/images/product-image/12.jpg"
                                            alt=""
                                        />
                                        </RouterLink>
                                        <div class="quick-view">
                                            <a
                                                class="quick_view"
                                                href="#"
                                                data-link-action="quickview"
                                                title="مشاهده سریع"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                <i class="icon-magnifier icons"></i>
                                                </a>
                                        </div>
                                </div>
                                <div class="product-decs">
                                    <RouterLink
                                        class="inner-link"
                                        to="/shop/4-column"
                                    ><span>عنوان محصول</span></RouterLink>
                                        <h2><RouterLink
                                                to="/product"
                                                class="product-link"
                                            >توضیحات مربوط به محصول</RouterLink>
                                        </h2>
                                        <div class="rating-product">
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                            <i class="ion-android-star"></i>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut">50.000 تومان</li>
                                            </ul>
                                        </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-buttons">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Recently Add area end -->
        <!-- Banner Area Start -->
        <div class="banner-area mb-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="banner-wrapper">
                            <RouterLink to="/shop/4-column"><img
                                    src="/assets/images/banner-image/7.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <div class="banner-wrapper">
                            <RouterLink to="/shop/4-column"><img
                                    src="/assets/images/banner-image/8.jpg"
                                    alt=""
                                /></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Banner Area End -->
    </div>
</template>
