INSERT INTO
    users (id, name, email, password, profile, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Flavio', 'frmilanij@gmail.com', '123123123', 'Administrador', NOW(), NOW()),
  (gen_random_uuid()::text, 'Gabriel', 'gabriel.martins2315@gmail.com', '123123123', 'Administrador', NOW(), NOW()),
  (gen_random_uuid()::text, 'Raquel', 'raquel.gomexs@gmail.com', '123123123', 'Administrador', NOW(), NOW()),
  (gen_random_uuid()::text, 'Adriana', 'drisouza1325@gmail.com', '123123123', 'Administrador', NOW(), NOW()),
  (gen_random_uuid()::text, 'Mateus', 'mateus3009@gmail.com', '123123123', 'Administrador', NOW(), NOW()),
  (gen_random_uuid()::text, 'Eveline', 'evelinecontato@gmail.com', '123123123', 'Administrador', NOW(), NOW());
