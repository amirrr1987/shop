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
                                <li>تسویه حساب</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb Area End-->
        <!-- checkout area start -->
        <div class="checkout-area mt-60px mb-40px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="billing-info-wrap">
                            <h3>جزئیات صورتحساب</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>نام</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>نام خانوادگی</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20px">
                                        <label>نام شرکت</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-select mb-20px">
                                        <label>کشور</label>
                                        <select>
                                            <option>انتخاب کشور</option>
                                            <option>ایران</option>
                                            <option>قطر</option>
                                            <option>امارات</option>
                                            <option>عراق</option>
                                            <option>ارمنستان</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20px">
                                        <label>آدرس</label>
                                        <input
                                            class="billing-address"
                                            placeholder="نام خیابان و کوچه"
                                            type="text"
                                        />
                                        <input
                                            placeholder="پلاک و واحد"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20px">
                                        <label>شهر</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>استان</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>کد پستی</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>تلفن</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20px">
                                        <label>ایمیل</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class="checkout-account mb-30px">
                                <input
                                    class="checkout-toggle2"
                                    type="checkbox"
                                />
                                <label>ایجاد حساب کاربری</label>
                            </div>
                            <div class="checkout-account-toggle open-toggle2 mb-30">
                                <input
                                    placeholder="ایمیل"
                                    type="email"
                                />
                                <input
                                    placeholder="گذرواژه"
                                    type="password"
                                />
                                <button
                                    class="btn-hover checkout-btn"
                                    type="submit"
                                >ثبت نام</button>
                            </div>
                            <div class="additional-info-wrap">
                                <h4>اطلاعات تکمیلی</h4>
                                <div class="additional-info">
                                    <label>یادداشت</label>
                                    <textarea
                                        placeholder="اگر یادداشتی درباره سفارشتان دارید، وارد نمایید. "
                                        name="message"
                                    ></textarea>
                                </div>
                            </div>
                            <div class="checkout-account mt-25">
                                <input
                                    class="checkout-toggle"
                                    type="checkbox"
                                />&nbsp;به آدرس دیگری ارسال شود؟
                            </div>
                            <div class="different-address open-toggle mt-30px">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>نام</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>نام خانوارگی</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="billing-info mb-20px">
                                            <label>نام شرکت</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="billing-select mb-20px">
                                            <label>کشور</label>
                                            <select>
                                                <option>انتخاب کشور</option>
                                                <option>ایران</option>
                                                <option>قطر</option>
                                                <option>امارات</option>
                                                <option>عراق</option>
                                                <option>ارمنستان</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="billing-info mb-20px">
                                            <label>آدرس</label>
                                            <input
                                                class="billing-address"
                                                placeholder="نام خیابان و کوچه"
                                                type="text"
                                            />
                                            <input
                                                placeholder="پلاک و واحد"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="billing-info mb-20px">
                                            <label>شهر</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>استان</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>کد پستی</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>تلفن</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="billing-info mb-20px">
                                            <label>ایمیل</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 mt-md-30px mt-lm-30px">
                        <div class="your-order-area">
                            <h3>سفارش شما</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-product-info">
                                    <div class="your-order-top">
                                        <ul>
                                            <li>محصول</li>
                                            <li>جمع</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-middle">
                                        <ul>
                                            <li><span class="order-middle-left">عنوان محصول X
                                                    1</span> <span class="order-price">50.000 تومان
                                                </span></li>
                                            <li><span class="order-middle-left">عنوان محصول X
                                                    1</span> <span class="order-price">50.000 تومان
                                                </span></li>
                                        </ul>
                                    </div>
                                    <div class="your-order-bottom">
                                        <ul>
                                            <li class="your-order-shipping">هزینه ارسال</li>
                                            <li>رایگان</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-total">
                                        <ul>
                                            <li class="order-total">جمع</li>
                                            <li>100.000 تومان</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="payment-method">
                                    <div class="payment-accordion element-mrg">
                                        <div
                                            class="panel-group"
                                            id="accordion"
                                        >
                                            <div class="panel payment-accordion">
                                                <div
                                                    class="panel-heading"
                                                    id="method-one"
                                                >
                                                    <h4 class="panel-title">
                                                        <a
                                                            data-bs-toggle="collapse"
                                                            data-parent="#accordion"
                                                            href="#method1"
                                                        >
                                                            سوال شماره یک
                                                            </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="method1"
                                                    class="panel-collapse collapse show"
                                                >
                                                    <div class="panel-body">
                                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی
                                                            نامفهوم از صنعت چاپ و با استفاده از
                                                            طراحان گرافیک است.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel payment-accordion">
                                                <div
                                                    class="panel-heading"
                                                    id="method-two"
                                                >
                                                    <h4 class="panel-title">
                                                        <a
                                                            class="collapsed"
                                                            data-bs-toggle="collapse"
                                                            data-parent="#accordion"
                                                            href="#method2"
                                                        >
                                                            سوال شماره دو
                                                            </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="method2"
                                                    class="panel-collapse collapse"
                                                >
                                                    <div class="panel-body">
                                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی
                                                            نامفهوم از صنعت چاپ و با استفاده از
                                                            طراحان گرافیک است.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel payment-accordion">
                                                <div
                                                    class="panel-heading"
                                                    id="method-three"
                                                >
                                                    <h4 class="panel-title">
                                                        <a
                                                            class="collapsed"
                                                            data-bs-toggle="collapse"
                                                            data-parent="#accordion"
                                                            href="#method3"
                                                        >
                                                            سوال شماره سه
                                                            </a>
                                                    </h4>
                                                </div>
                                                <div
                                                    id="method3"
                                                    class="panel-collapse collapse"
                                                >
                                                    <div class="panel-body">
                                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی
                                                            نامفهوم از صنعت چاپ و با استفاده از
                                                            طراحان گرافیک است.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Place-order mt-25">
                                <a
                                    class="btn-hover"
                                    href="#"
                                >پرداخت و ثبت سفارش</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- checkout area end -->
    </div>
</template>
