# Breadcrumb

Auxilia o usuário na navegação entre páginas ou telas.

## Dependências

Nenhuma dependência.

## Código básico

```html
<ul class="br-breadcrumb">
  <li class="home">
    <a href="#">
      <span class="sr-only">Página inicial</span>
      <i class="fas fa-home"></i>
    </a>
  </li>
  <li><a href="#">Tela anterior</a></li>
  <li class="is-active"><a href="#">Tela atual</a></li>
</ul>
```

# Anatomia do componente

Este componente é formado pelos seguintes elementos:

- `br-breadcrumb`: container do componente

Use o componente na tag `<ul>`.

# Estados

Nenhum estado adicional.

# Regras especiais

O primeiro item é o `home`. É representado por ícone.

A tela atual deve conter a classe `is-active`.