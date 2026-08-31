<template>
    <div class="page-content">
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
        >
            <div
                class="modal-dialog"
                role="document"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <button
                            type="button"
                            class="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ><span aria-hidden="true">x</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5 col-sm-12 col-xs-12 mb-lm-100px mb-sm-30px">
                                <!-- Swiper -->
                                <div class="swiper-container gallery-top">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/11.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/12.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/13.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/14.jpg"
                                                alt=""
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-container gallery-thumbs">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/11.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/12.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/13.jpg"
                                                alt=""
                                            >
                                        </div>
                                        <div class="swiper-slide">
                                            <img
                                                class="img-responsive m-auto"
                                                src="/assets/images/product-image/14.jpg"
                                                alt=""
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 col-sm-12 col-xs-12">
                                <div class="product-details-content quickview-content">
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
                                    <p class="quickview-para">لورم ایپسوم متن ساختگی با تولید سادگی
                                        نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                                        چاپگرها و متون بلکه روزنامه و مجله که لازم است و برای شرایط
                                        فعلی می باشد</p>
                                    <div class="pro-details-size-color">
                                        <div class="pro-details-color-wrap">
                                            <span>رنگ</span>
                                            <div class="pro-details-color-content">
                                                <ul>
                                                    <li class="blue"></li>
                                                    <li class="maroon active"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pro-details-quality">
                                        <div class="cart-plus-minus">
                                            <input
                                                class="cart-plus-minus-box"
                                                type="text"
                                                name="qtybutton"
                                                value="1"
                                            />
                                        </div>
                                        <div class="pro-details-cart btn-hover">
                                            <RouterLink to="#"> + افزودن به سبد خرید</RouterLink>
                                        </div>
                                    </div>
                                    <div class="pro-details-wish-com">
                                        <div class="pro-details-wishlist">
                                            <RouterLink to="/wishlist"><i
                                                    class="ion-android-favorite-outline"
                                                ></i>افزودن به لیست علاقه مندی ها</RouterLink>
                                        </div>
                                        <div class="pro-details-compare">
                                            <RouterLink to="/compare"><i
                                                    class="ion-ios-shuffle-strong"
                                                ></i>مقایسه محصول
                                            </RouterLink>
                                        </div>
                                    </div>
                                    <div class="pro-details-social-info">
                                        <span>اشتراک گذاری :</span>
                                        <div class="social-info">
                                            <ul>
                                                <li>
                                                    <RouterLink to="#"><i
                                                            class="ion-social-facebook"
                                                        ></i>
                                                    </RouterLink>
                                                </li>
                                                <li>
                                                    <RouterLink to="#"><i
                                                            class="ion-social-twitter"></i>
                                                    </RouterLink>
                                                </li>
                                                <li>
                                                    <RouterLink to="#"><i
                                                            class="ion-social-google"></i>
                                                    </RouterLink>
                                                </li>
                                                <li>
                                                    <RouterLink to="#"><i
                                                            class="ion-social-instagram"
                                                        ></i>
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
        <!-- Modal end -->
    </div>
</template>
