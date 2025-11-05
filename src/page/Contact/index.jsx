import React, { useState } from "react";
import { Grid, Helmet, Section, SectionBody, SectionTitle } from "../../Common";
import { Button, Input, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      message.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    message.success("Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Helmet title="Liên hệ với chúng tôi">
      <div className="contact">
        {/* PHẦN 1: THÔNG TIN LIÊN HỆ */}
        <Section>
          <SectionTitle>Liên hệ với chúng tôi</SectionTitle>
          <SectionBody>
            <Grid col={3} mdCol={2} smCol={1} gap={30}>
              {/* Cột 1: Địa chỉ - Cập nhật Tiền Giang */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <EnvironmentOutlined />
                </div>
                <h3>Địa chỉ</h3>
                <p>123 Đường 30/4, TP. Mỹ Tho, Tiền Giang, Việt Nam</p>
              </div>

              {/* Cột 2: Điện thoại */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <PhoneOutlined />
                </div>
                <h3>Điện thoại</h3>
                <p>
                  <a href="tel:0123456789">0123 456 789</a>
                  <br />
                  <a href="tel:0987654321">0987 654 321</a>
                </p>
              </div>

              {/* Cột 3: Email */}
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <MailOutlined />
                </div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:support@shop.com">support@shop.com</a>
                  <br />
                  <a href="mailto:info@shop.com">info@shop.com</a>
                </p>
              </div>
            </Grid>
          </SectionBody>
        </Section>

        {/* PHẦN 2: FORM + BẢN ĐỒ - Cập nhật Tiền Giang */}
        <Section>
          <SectionBody>
            <Grid col={2} mdCol={1} smCol={1} gap={40}>
              {/* Cột trái: Form liên hệ */}
              <div className="contact__form">
                <h3>Gửi tin nhắn cho chúng tôi</h3>
                <form onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    placeholder="Họ và tên"
                    size="large"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email của bạn"
                    size="large"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                    required
                  />
                  <TextArea
                    name="message"
                    placeholder="Nội dung tin nhắn..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                    required
                  />
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    block
                  >
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>

              {/* Cột phải: Google Maps Tiền Giang */}
              <div className="contact__map">
                <iframe
                  title="Bản đồ Tiền Giang"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.776225505!2d106.3643!3d10.3729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa1f0b0b0b0b0%3A0x0!2sT%C3%AAnh%20Ti%E1%BB%81n%20Giang!5e0!3m2!1svi!2s!4v1698765432100!5m2!1svi!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: 16 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Grid>
          </SectionBody>
        </Section>

        {/* PHẦN 3: THÔNG TIN BỔ SUNG (TÙY CHỌN) */}
        <Section>
          <SectionBody>
            <div className="contact__hours">
              <h3>Giờ làm việc</h3>
              <p>
                <strong>Thứ 2 - Thứ 6:</strong> 8:00 - 21:00
                <br />
                <strong>Thứ 7 - CN:</strong> 9:00 - 20:00
              </p>
            </div>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default React.memo(Contact);
