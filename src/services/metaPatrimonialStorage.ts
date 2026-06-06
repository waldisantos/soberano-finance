import { META_PATRIMONIAL_PADRAO } from "../data/metaPatrimonialPadrao";

const KEY = "metaPatrimonial";

export function carregarMetaPatrimonial() {
  const data = localStorage.getItem(KEY);

  if (!data)
    return META_PATRIMONIAL_PADRAO;

  return JSON.parse(data);
}

export function salvarMetaPatrimonial(
  meta: any
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(meta)
  );
}