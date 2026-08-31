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
                                <li>تشکر از خرید شما</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- Thank You area start -->
        <div class="thank-you-area mtb-60px">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-8">
                        <div class="inner_complated">
                            <div class="img_cmpted"><img
                                    src="/assets/images/icons/cmpted_logo.png"
                                    alt=""
                                ></div>
                            <p class="dsc_cmpted">با تشکر از شما برای ثبت سفارش در فروشگاه ما. شما
                                به زودی یک ایمیل تائید دریافت خواهید کرد.</p>
                            <div class="btn_cmpted">
                                <RouterLink
                                    to="/shop/4-column"
                                    class="shop-btn"
                                    title="Go To Shop"
                                >به خرید ادامه دهید</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="quick_order ">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-12">
                        <div class="main_quickorder text-align-center">
                            <h3 class="title">برای سفارش سریع با ما تماس بگیرید</h3>
                            <div class="cntct typewriter-effect tm-ltr"><span class="call_desk"><a
                                        href="tel:02100000000"
                                        id="typewriter_num"
                                    >021 0000 0000</a></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Thank You area end -->
    </div>
</template>
