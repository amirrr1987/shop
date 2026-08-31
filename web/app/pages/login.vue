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
                                <li>ورود / ثبت نام</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- login area start -->
        <div class="login-register-area mtb-60px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-12 ml-auto mr-auto">
                        <div class="login-register-wrapper">
                            <div class="login-register-tab-list nav">
                                <a
                                    class="active"
                                    data-bs-toggle="tab"
                                    href="#lg1"
                                >
                                    <h4>ورود</h4>
                                </a>
                                <a
                                    data-bs-toggle="tab"
                                    href="#lg2"
                                >
                                    <h4>ثبت نام</h4>
                                </a>
                            </div>
                            <div class="tab-content">
                                <div
                                    id="lg1"
                                    class="tab-pane active"
                                >
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form
                                                action="#"
                                                method="post"
                                            >
                                                <input
                                                    type="text"
                                                    name="user-name"
                                                    placeholder="نام کاربری"
                                                />
                                                <input
                                                    type="password"
                                                    name="user-password"
                                                    placeholder="گذرواژه"
                                                />
                                                <div class="button-box">
                                                    <div class="login-toggle-btn">
                                                        <input type="checkbox" />
                                                        <a
                                                            class="flote-none"
                                                            href="javascript:void(0)"
                                                        >مرا به خاطر بسپار</a>
                                                        <a href="#">بازیابی گذرواژه</a>
                                                    </div>
                                                    <button type="submit"><span>ورود</span></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="lg2"
                                    class="tab-pane"
                                >
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form
                                                action="#"
                                                method="post"
                                            >
                                                <input
                                                    type="text"
                                                    name="user-name"
                                                    placeholder="نام کاربری"
                                                />
                                                <input
                                                    type="password"
                                                    name="user-password"
                                                    placeholder="گذرواژه"
                                                />
                                                <input
                                                    name="user-email"
                                                    placeholder="ایمیل"
                                                    type="email"
                                                />
                                                <div class="button-box">
                                                    <button type="submit"><span>ثبت
                                                            نام</span></button>
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
        <!-- login area end -->
    </div>
</template>
