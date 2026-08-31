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
                                <li>فروشگاه</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- Shop Category Area End -->
        <div class="shop-category-area mt-30px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 order-lg-last col-md-12 order-md-first">
                        <!-- Shop Top Area Start -->
                        <div class="shop-top-bar d-flex">
                            <!-- Left Side start -->
                            <div class="shop-tab nav d-flex">
                                <a
                                    href="#shop-1"
                                    data-bs-toggle="tab"
                                >
                                    <i class="fa fa-th"></i>
                                    </a>
                                    <a
                                        class="active"
                                        href="#shop-2"
                                        data-bs-toggle="tab"
                                    >
                                        <i class="fa fa-list"></i>
                                        </a>
                                        <p>17 محصول وجود دارد.</p>
                            </div>
                            <!-- Left Side End -->
                            <!-- Right Side Start -->
                            <div class="select-shoing-wrap d-flex">
                                <div class="shot-product">
                                    <p>مرتب سازی :</p>
                                </div>
                                <div class="shop-select">
                                    <select>
                                        <option value="">جدید ترین</option>
                                        <option value="">قدیمی ترین</option>
                                        <option value="">محبوب ترین</option>
                                        <option value="">پرفروش ترین</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Right Side End -->
                        </div>
                        <!-- Shop Top Area End -->

                        <!-- Shop Bottom Area Start -->
                        <div class="shop-bottom-area mt-35">
                            <!-- Shop Tab Content Start -->
                            <div class="tab-content jump">
                                <!-- Tab One Start -->
                                <div
                                    id="shop-1"
                                    class="tab-pane "
                                >
                                    <div
                                        class="row responsive-md-class responsive-xl-class responsive-lg-class">
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                            src="/assets/images/product-image/6.jpg"
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                        <div class="col-xl-3 col-md-4 col-sm-6 ">
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
                                                                <i
                                                                    class="ion-ios-search-strong"></i>
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
                                                            >جزئیات مربوط به محصول فروشگا...
                                                                </RouterLink>
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
                                                                class="cart-btn"
                                                                href="#"
                                                            >خرید</a>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/wishlist"><i
                                                                    class="icon-heart"
                                                                ></i></RouterLink>
                                                        </li>
                                                        <li>
                                                            <RouterLink to="/compare"><i
                                                                    class="icon-shuffle"
                                                                ></i></RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                                <!-- Tab One End -->
                                <!-- Tab Two Start -->
                                <div
                                    id="shop-2"
                                    class="tab-pane active"
                                >
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
                                                            <div class="img-block">
                                                                <RouterLink
                                                                    to="/product"
                                                                    class="thumbnail"
                                                                >
                                                                    <img
                                                                        class="first-img"
                                                                        src="/assets/images/product-image/13.jpg"
                                                                        alt=""
                                                                    />
                                                                    <img
                                                                        class="second-img"
                                                                        src="/assets/images/product-image/14.jpg"
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page mb-30px scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
                                                            <div class="img-block">
                                                                <RouterLink
                                                                    to="/product"
                                                                    class="thumbnail"
                                                                >
                                                                    <img
                                                                        class="first-img"
                                                                        src="/assets/images/product-image/13.jpg"
                                                                        alt=""
                                                                    />
                                                                    <img
                                                                        class="second-img"
                                                                        src="/assets/images/product-image/14.jpg"
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shop-list-wrap shop-list-page scroll-zoom">
                                        <div class="row list-product m-0px">
                                            <div class="col-md-12 padding-0px">
                                                <div class="row">
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                                                        <div class="left-img">
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
                                                                            <i
                                                                                class="ion-ios-search-strong"></i>
                                                                            </a>
                                                                    </div>
                                                            </div>
                                                            <ul class="product-flag">
                                                                <li class="new">جدید</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                                        <div class="product-desc-wrap">
                                                            <div class="product-decs">
                                                                <RouterLink
                                                                    class="inner-link"
                                                                    to="/shop/4-column"
                                                                ><span>عنوان محصول</span>
                                                                    </RouterLink>
                                                                    <h2><RouterLink
                                                                            to="/product"
                                                                            class="product-link"
                                                                        >جزئیات مربوط به محصول
                                                                            فروشگاه</RouterLink>
                                                                    </h2>
                                                                    <div class="rating-product">
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                        <i
                                                                            class="ion-android-star"></i>
                                                                    </div>
                                                                    <div class="product-intro-info">
                                                                        <p>لورم ایپسوم متن ساختگی با
                                                                            تولید سادگی از صنعت است.
                                                                        </p>
                                                                        <p>چاپگرها و متون بلکه
                                                                            روزنامه و مجله در ستون
                                                                            که لازم است.</p>
                                                                        <p>برای شرایط فعلی مورد نیاز
                                                                            و بهبود ابزارهای کاربردی
                                                                            می باشد.</p>
                                                                        <p>محصولات زیادی در شصت و سه
                                                                            درصد گذشته حال و آینده
                                                                            است.</p>
                                                                    </div>
                                                            </div>
                                                            <div class="box-inner">
                                                                <div class="in-stock">وضعیت :
                                                                    <span>موجود در انبار</span>
                                                                </div>
                                                                <div class="pricing-meta">
                                                                    <ul>
                                                                        <li
                                                                            class="old-price not-cut">
                                                                            50.000 تومان</li>
                                                                    </ul>
                                                                </div>
                                                                <div class="add-to-link">
                                                                    <ul>
                                                                        <li class="cart"><a
                                                                                title="افزودن به سبد خرید"
                                                                                class="cart-btn"
                                                                                href="#"
                                                                            >افزودن به سبد خرید
                                                                                </a>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/wishlist"
                                                                                title="افزودن به لیست علاقه مندی ها"
                                                                            ><i class="icon-heart"></i>
                                                                                افزودن به لیست علاقه
                                                                                مندی ها</RouterLink>
                                                                        </li>
                                                                        <li>
                                                                            <RouterLink
                                                                                to="/compare"
                                                                                title="مقایسه محصول"
                                                                            ><i class="icon-shuffle"></i>
                                                                                مقایسه محصول
                                                                                </RouterLink>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Tab Two End -->
                            </div>
                            <!-- Shop Tab Content End -->
                            <!--  Pagination Area Start -->
                            <div class="pro-pagination-style text-center mb-60px mt-30px">
                                <ul>
                                    <li>
                                        <a
                                            class="prev"
                                            href="#"
                                        ><i class="ion-ios-arrow-right"></i></a>
                                    </li>
                                    <li><a
                                            class="active"
                                            href="#"
                                        >1</a>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a
                                            class="next"
                                            href="#"
                                        ><i class="ion-ios-arrow-left"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <!--  Pagination Area End -->
                        </div>
                        <!-- Shop Bottom Area End -->
                    </div>
                    <!-- Sidebar Area Start -->
                    <div
                        class="col-lg-3 order-lg-first col-md-12 order-md-last mb-md-60px mb-lm-60px">
                        <div class="shop-sidebar-wrap">
                            <div class="sidebar-widget padding-30px bg-light-gray-2 mb-30px">
                                <h3 class="sidebar-title">لوازم الکترونیکی</h3>
                                <div
                                    class="accordion"
                                    id="accordionExample"
                                >
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingOne"
                                        >
                                            <a
                                                href="#"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="false"
                                                aria-controls="collapseOne"
                                                class="collapsed"
                                            >دسته شماره یک</a>
                                        </div>

                                        <div
                                            id="collapseOne"
                                            class="collapse"
                                            aria-labelledby="headingOne"
                                            data-parent="#accordionExample"
                                            style=""
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingTwo"
                                        >
                                            <a
                                                href="#"
                                                class="collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >دسته شماره دو</a>
                                        </div>
                                        <div
                                            id="collapseTwo"
                                            class="collapse"
                                            aria-labelledby="headingTwo"
                                            data-parent="#accordionExample"
                                            style=""
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingThree"
                                        >
                                            <a
                                                href="#"
                                                class="collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >دسته شماره سه</a>
                                        </div>
                                        <div
                                            id="collapseThree"
                                            class="collapse"
                                            aria-labelledby="headingThree"
                                            data-parent="#accordionExample"
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingFour"
                                        >
                                            <a
                                                href="#"
                                                class="collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >دسته شماره چهار</a>
                                        </div>
                                        <div
                                            id="collapseFour"
                                            class="collapse"
                                            aria-labelledby="headingFour"
                                            data-parent="#accordionExample"
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingFive"
                                        >
                                            <a
                                                href="#"
                                                class="collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >دسته شماره پنج</a>
                                        </div>
                                        <div
                                            id="collapseFive"
                                            class="collapse"
                                            aria-labelledby="headingFive"
                                            data-parent="#accordionExample"
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                    <div class="card">
                                        <div
                                            class="card-header"
                                            id="headingSix"
                                        >
                                            <a
                                                href="#"
                                                class="collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                            >دسته شماره شش</a>
                                        </div>
                                        <div
                                            id="collapseSix"
                                            class="collapse"
                                            aria-labelledby="headingSix"
                                            data-parent="#accordionExample"
                                        >
                                            <div class="card-body">
                                                <ul class="category-list">
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 1</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 2</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 3</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 4</RouterLink>
                                                    </li>
                                                    <li>
                                                        <RouterLink to="#">زیر دسته 5</RouterLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> <!-- card -->
                                </div>
                            </div>
                            <!-- Sidebar single item -->
                            <div class="sidebar-widget-group mt-20 padding-30px">
                                <h3 class="sidebar-title">فیلتر</h3>
                                <div class="sidebar-widget mt-20">
                                    <h4 class="pro-sidebar-title">قیمت</h4>
                                    <div class="price-filter mt-10">
                                        <div class="price-slider-amount">
                                            <input
                                                type="text"
                                                id="amount"
                                                name="price"
                                                placeholder="Add Your Price"
                                            />
                                        </div>
                                        <div id="slider-range"></div>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget mt-30">
                                    <h4 class="pro-sidebar-title">اندازه</h4>
                                    <div class="sidebar-widget-list">
                                        <ul>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input type="checkbox" />
                                                    <RouterLink to="#">اندازه
                                                        1<span>(4)</span> </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">اندازه 2<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">اندازه 3<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">اندازه 4<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget no-cba mt-20">
                                    <h4 class="pro-sidebar-title">رنگ</h4>
                                    <div class="sidebar-widget-list">
                                        <ul>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input type="checkbox" /> <a
                                                        href="#">خاکستری<span>(2)</span>
                                                        </a>
                                                        <span class="checkmark grey"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">سفید<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark white"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">سیاه<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark black"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">شتری<span>(4)</span>
                                                    </RouterLink>
                                                    <span class="checkmark brown"></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget mt-30">
                                    <h4 class="pro-sidebar-title">نام تجاری</h4>
                                    <div class="sidebar-widget-list">
                                        <ul>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input type="checkbox" />
                                                    <RouterLink to="#">عنوان
                                                        شماره یک<span>(10)</span> </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="sidebar-widget-list-left">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                    />
                                                    <RouterLink to="#">عنوان شماره
                                                        دو<span>(7)</span>
                                                    </RouterLink>
                                                    <span class="checkmark"></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar single item -->
                            <div class="sidebar-widget tag mt-30px">
                                <div class="main-heading">
                                    <h3 class="sidebar-title">برچسب ها</h3>
                                </div>
                                <div class="sidebar-widget-tag">
                                    <ul>
                                        <li>
                                            <RouterLink to="#">دوربین</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="#">کامپیوتر</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="#">لپ تاپ</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="#">لوازم جانبی</RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar single item -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shop Category Area End -->
    </div>
</template>
