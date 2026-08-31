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
                                <li>ارتباط با ما</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- contact area start -->
        <div class="contact-area mtb-60px">
            <div class="container">
                <div class="contact-map mb-10">
                    <div class="mapouter">
                        <div class="gmap_canvas">
                            <iframe
                                id="gmap_canvas"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207344.50843900483!2d51.347655249999995!3d35.707573749999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province!5e0!3m2!1sen!2s!4v1675950279100!5m2!1sen!2s"
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                            ></iframe>
                            <a href="https://sites.google.com/view/maps-api-v2/mapv2">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="custom-row-2">
                    <div class="col-lg-4 col-md-5 mb-lm-30px">
                        <div class="contact-info-wrap">
                            <div class="single-contact-info">
                                <div class="contact-icon">
                                    <i class="ion-android-call"></i>
                                </div>
                                <div class="contact-info-dec">
                                    <p class="tm-ltr">
                                        <a href="tel://02100000000">021 0000 0000
                                        </a>
                                    </p>
                                    <p class="tm-ltr">
                                        <a href="tel://02100000000">021 0000 0000
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div class="single-contact-info">
                                <div class="contact-icon">
                                    <i class="ion-android-globe"></i>
                                </div>
                                <div class="contact-info-dec">
                                    <p>
                                        <a href="mailto://example@info.com">example@info.com
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto://example@info.com">example@info.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div class="single-contact-info">
                                <div class="contact-icon">
                                    <i class="ion-android-pin"></i>
                                </div>
                                <div class="contact-info-dec">
                                    <p>ایران ، تهران ، میدان فردوسی</p>
                                    <p>ایران ، مشهد ، میدان فردوسی</p>
                                </div>
                            </div>
                            <div class="contact-social">
                                <h3>شبکات اجتماعی ما</h3>
                                <div class="social-info">
                                    <ul>
                                        <li>
                                            <a href="#"><i class="ion-social-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="ion-social-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="ion-social-youtube"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="ion-social-google"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="ion-social-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7">
                        <div class="contact-form">
                            <div class="contact-title mb-30">
                                <h2>ارسال پیام</h2>
                            </div>
                            <form
                                class="contact-form-style"
                                id="contact-form"
                                action="http://"
                                method="post"
                            >
                                <div class="row">
                                    <div class="col-lg-6">
                                        <input
                                            name="name"
                                            placeholder="* نام"
                                            type="text"
                                        />
                                    </div>
                                    <div class="col-lg-6">
                                        <input
                                            name="email"
                                            placeholder="* ایمیل"
                                            type="email"
                                        />
                                    </div>
                                    <div class="col-lg-12">
                                        <input
                                            name="subject"
                                            placeholder="* موضوع"
                                            type="text"
                                        />
                                    </div>
                                    <div class="col-lg-12">
                                        <textarea
                                            name="message"
                                            placeholder="* متن پیام"
                                        ></textarea>
                                        <button
                                            class="submit"
                                            type="submit"
                                        >ارسال</button>
                                    </div>
                                </div>
                            </form>
                            <p class="form-messege"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- contact area end -->
    </div>
</template>
