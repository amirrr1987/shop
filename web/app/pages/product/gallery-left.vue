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
                                <li>صفحه محصول (با گالری سمت چپ)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- Shop details Area start -->
        <section class="product-details-area mtb-60px">
            <div class="container">
                <div class="row flex-lg-row-reverse flex-xl-row-reverse">
                    <div class="col-md-12 col-xl-6 col-lg-6">
                        <div class="single-product-gallery mb-30px">
                            <div class="single-product-slider-wrapper d-flex flex-wrap">
                                <div class="single-product-slider-item">
                                    <RouterLink to="#"><img
                                            class="img-responsive"
                                            src="/assets/images/product-image/6.jpg"
                                            alt="slider-item-img"
                                        ></RouterLink>
                                </div>
                                <div class="single-product-slider-item swiper-slide">
                                    <RouterLink to="#"><img
                                            class="img-responsive"
                                            src="/assets/images/product-image/21.jpg"
                                            alt="slider-item-img"
                                        ></RouterLink>
                                </div>
                                <div class="single-product-slider-item swiper-slide">
                                    <RouterLink to="#"><img
                                            class="img-responsive"
                                            src="/assets/images/product-image/22.jpg"
                                            alt="slider-item-img"
                                        ></RouterLink>
                                </div>
                                <div class="single-product-slider-item swiper-slide">
                                    <RouterLink to="#"><img
                                            class="img-responsive"
                                            src="/assets/images/product-image/19.jpg"
                                            alt="slider-item-img"
                                        ></RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-xl-6 col-lg-6">
                        <div class="product-details-content">
                            <h2>عنوان محصول فروشگاه</h2>
                            <p class="reference">امکان مرجوعی :<span> وجود دارد</span></p>
                            <div class="pro-details-rating-wrap">
                                <div class="rating-product">
                                    <i class="ion-android-star"></i>
                                    <i class="ion-android-star"></i>
                                    <i class="ion-android-star"></i>
                                    <i class="ion-android-star"></i>
                                    <i class="ion-android-star"></i>
                                </div>
                                <span class="read-review"><a
                                        class="reviews"
                                        href="#"
                                    >مشاهده نظرات (1)</a></span>
                            </div>
                            <div class="pricing-meta">
                                <ul>
                                    <li class="old-price not-cut">50.000 تومان</li>
                                </ul>
                            </div>
                            <div class="pro-details-list">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                                    در ستون و سطرآنچنان که لازم است.</p>
                                <ul>
                                    <li>- ویژگی اول محصول</li>
                                    <li>- ویژگی دوم محصول</li>
                                    <li>- ویژگی سوم محصول</li>
                                </ul>
                            </div>
                            <div class="pro-details-quality mt-0px">
                                <div class="cart-plus-minus">
                                    <input
                                        class="cart-plus-minus-box"
                                        type="text"
                                        name="qtybutton"
                                        value="1"
                                    />
                                </div>
                                <div class="pro-details-cart btn-hover">
                                    <RouterLink to="#"> افزودن به سبد خرید</RouterLink>
                                </div>
                            </div>
                            <div class="pro-details-wish-com">
                                <div class="pro-details-wishlist">
                                    <RouterLink to="#"><i class="icon-heart"></i>افزودن به لیست
                                        علاقه مندی ها</RouterLink>
                                </div>
                                <div class="pro-details-compare">
                                    <RouterLink to="#"><i class="icon-shuffle"></i>مقایسه محصول</RouterLink>
                                </div>
                            </div>
                            <div class="pro-details-social-info">
                                <span>اشتراک گذاری :</span>
                                <div class="social-info">
                                    <ul>
                                        <li>
                                            <a
                                                title="Facebook"
                                                href="#"
                                            ><i class="ion-social-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a
                                                title="Twitter"
                                                href="#"
                                            ><i class="ion-social-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a
                                                title="Google+"
                                                href="#"
                                            ><i class="ion-social-google"></i></a>
                                        </li>
                                        <li>
                                            <a
                                                title="Instagram"
                                                href="#"
                                            ><i class="ion-social-instagram"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="pro-details-policy">
                                <ul>
                                    <li><img
                                            src="/assets/images/icons/policy.png"
                                            alt=""
                                        /><span>سیاست امنیتی : توضیحات مربوط به این ویژگی</span>
                                    </li>
                                    <li><img
                                            src="/assets/images/icons/policy-2.png"
                                            alt=""
                                        /><span>حمل و نقل : توضیحات مربوط به این ویژگی</span></li>
                                    <li><img
                                            src="/assets/images/icons/policy-3.png"
                                            alt=""
                                        /><span>ضمانت مرجوعی : توضیحات مربوط به این ویژگی</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Shop details Area End -->
        <!-- product details description area start -->
        <div class="description-review-area mb-60px">
            <div class="container">
                <div class="description-review-wrapper">
                    <div class="description-review-topbar nav">
                        <a
                            data-bs-toggle="tab"
                            href="#des-details1"
                        >توضیحات</a>
                        <a
                            class="active"
                            data-bs-toggle="tab"
                            href="#des-details2"
                        >جزئیات محصول</a>
                        <a
                            data-bs-toggle="tab"
                            href="#des-details3"
                        >نظرات (2)</a>
                    </div>
                    <div class="tab-content description-review-bottom">
                        <div
                            id="des-details2"
                            class="tab-pane active"
                        >
                            <div class="product-anotherinfo-wrapper">
                                <ul>
                                    <li><span>وزن</span> 400 گرم</li>
                                    <li><span>ابعاد</span>10.10.15 سانتی متر</li>
                                    <li><span>رنگ</span>سفید ، مشکی و خاکستری</li>
                                    <li><span>سایر اطلاعات</span>محصول دارای دفترچه راهنما می باشد.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            id="des-details1"
                            class="tab-pane"
                        >
                            <div class="product-description-wrapper">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است.</p>
                                <p>
                                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                                    است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                                    هدف بهبود
                                    ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته
                                    حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
                                    تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
                                    الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد که
                                    تمام و دشواری موجود در ارائه راهکارها می باشد.
                                </p>
                            </div>
                        </div>
                        <div
                            id="des-details3"
                            class="tab-pane"
                        >
                            <div class="row">
                                <div class="col-lg-7">
                                    <div class="review-wrapper">
                                        <div class="single-review">
                                            <div class="review-img">
                                                <img
                                                    src="/assets/images/review-image/1.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="review-content">
                                                <div class="review-top-wrap">
                                                    <div class="review-left">
                                                        <div class="review-name">
                                                            <h4>رضا محمدی</h4>
                                                        </div>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                    </div>
                                                    <div class="review-left">
                                                        <RouterLink to="#">پاسخ دادن</RouterLink>
                                                    </div>
                                                </div>
                                                <div class="review-bottom">
                                                    <p>
                                                        لورم ایپسوم متن ساختگی با تولید سادگی
                                                        نامفهوم از صنعت چاپ و با استفاده از طراحان
                                                        گرافیک است چاپگرها و متون بلکه روزنامه و
                                                        مجله در ستون و سطرآنچنان که لازم است و برای
                                                        شرایط فعلی تکنولوژی است.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="single-review child-review">
                                            <div class="review-img">
                                                <img
                                                    src="/assets/images/review-image/1.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="review-content">
                                                <div class="review-top-wrap">
                                                    <div class="review-left">
                                                        <div class="review-name">
                                                            <h4>رضا محمدی</h4>
                                                        </div>
                                                        <div class="rating-product">
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                            <i class="ion-android-star"></i>
                                                        </div>
                                                    </div>
                                                    <div class="review-left">
                                                        <RouterLink to="#">پاسخ دادن</RouterLink>
                                                    </div>
                                                </div>
                                                <div class="review-bottom">
                                                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                                        از صنعت چاپ و با استفاده از طراحان گرافیک
                                                        است چاپگرها و متون بلکه روزنامه و مجله در
                                                        ستون و سطرآنچنان که لازم است و برای شرایط
                                                        فعلی تکنولوژی است.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <div class="ratting-form-wrapper pl-50">
                                        <h3>ارسال نظر برای این محصول</h3>
                                        <div class="ratting-form">
                                            <form action="#">
                                                <div class="star-box">
                                                    <span>امتیاز شما :</span>
                                                    <div class="rating-product">
                                                        <i class="ion-android-star"></i>
                                                        <i class="ion-android-star"></i>
                                                        <i class="ion-android-star"></i>
                                                        <i class="ion-android-star"></i>
                                                        <i class="ion-android-star"></i>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="rating-form-style mb-10">
                                                            <input
                                                                placeholder="نام"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="rating-form-style mb-10">
                                                            <input
                                                                placeholder="ایمیل"
                                                                type="email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="rating-form-style form-submit">
                                                            <textarea
                                                                name="Your Review"
                                                                placeholder="متن پیام"
                                                            ></textarea>
                                                            <input
                                                                type="submit"
                                                                value="ارسال"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- product details description area end -->
        <!-- Feature Area start -->
        <div class="feature-area single-product-responsive mt-60px mb-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">ممکن است دوست داشته باشید</h2>
                        </div>
                    </div>
                </div>
                <div class="feature-slider-two slider-nav-style-1">
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
        <!-- Feature Area start -->
        <div class="feature-area single-product-responsive  mb-30px">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title">
                            <h2 class="section-heading">محصولات مشابه</h2>
                        </div>
                    </div>
                </div>
                <div class="feature-slider-two slider-nav-style-1">
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
                                    <h2>
                                        <RouterLink
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
                                            >خرید</a></li>
                                        <li>
                                            <RouterLink to="/wishlist"><i
                                                    class="icon-heart"></i></RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="/compare"><i
                                                    class="icon-shuffle"></i></RouterLink>
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
    </div>
</template>
