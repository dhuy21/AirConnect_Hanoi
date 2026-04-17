<!--
  Cảm ơn bạn đóng góp cho AirConnect Hanoi!
  Hãy điền đầy đủ các mục dưới đây để reviewer merge nhanh hơn.
-->

## Mục tiêu

<!-- Mô tả ngắn gọn vì sao PR này tồn tại. Link tới issue nếu có. -->
Closes #

## Loại thay đổi

- [ ] feat — tính năng mới
- [ ] fix — sửa bug
- [ ] refactor — cấu trúc lại code, không đổi hành vi
- [ ] perf — cải thiện hiệu năng
- [ ] docs — chỉ document
- [ ] test — thêm/sửa test
- [ ] chore — hạ tầng/build/CI
- [ ] breaking — có thay đổi phá vỡ API/contract

## Scope

- [ ] backend (NestJS)
- [ ] frontend (Next.js)
- [ ] database (schema / migration / seed)
- [ ] infra / CI / Railway
- [ ] docs

## Mô tả chi tiết

<!-- Giải thích cách tiếp cận, các quyết định kỹ thuật, trade-off. -->

## Screenshots / Demo

<!-- Bắt buộc nếu đổi UI. Kéo thả ảnh/GIF hoặc link Loom. -->

## Checklist trước khi merge

- [ ] Code build pass local (`pnpm build`)
- [ ] Lint pass (`pnpm lint`)
- [ ] Test pass (`pnpm test` — nếu áp dụng)
- [ ] Không commit secrets / `.env`
- [ ] Đã cập nhật `.env.example` nếu thêm biến mới
- [ ] Đã cập nhật migration nếu đổi entity
- [ ] Đã test trên PR Preview environment (Railway)
- [ ] Đã tự review diff của chính mình
