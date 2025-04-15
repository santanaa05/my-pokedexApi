import React, { useEffect, useState } from "react";
import CardPokemon from "../components/cardPokemon/CardPokemon";
import Cabecalho from "../components/cabecalho/Cabecalho";
import PesquisaPokemon from "../components/pesquisaPokemon/PesquisaPokemon";
import Paginacao from "../components/paginacao/paginacao";
import { Container, Grid } from "@mui/material";

export default function Home() {
  const [api, setApi] = useState([]);
  const [filtrado, setFiltrado] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 24;


  const getApiInfo = async () => {
    try {
      const endpoints = [];
      for (let i = offset + 1; i <= limit + offset; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      const responses = await Promise.all(
        endpoints.map((endpoint) => fetch(endpoint).then((res) => res.json()))
      );
      setApi((prevApi) => [...prevApi, ...responses]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiInfo();
  }, [offset]);

  const filtraPokemon = (nome) => {
    setFiltrado(nome);
  };

  return (
    <Container sx={{ paddingBottom: 5 }}>
      <Grid container spacing={2}>
        <Cabecalho />
        <PesquisaPokemon filtraPokemon={filtraPokemon} />

        {api
          .filter((pokemon) => pokemon.name.includes(filtrado))
          .map((item, index) => (
            <Grid item key={index} xs={12} sm={4} md={2}>
              <CardPokemon
                nome={item.name}
                imagem={item.sprites.front_default}
                tipo={item.types}
              />
            </Grid>
          ))}

        <Grid item xs={12} textAlign="center">
          <Paginacao addMore={() => setOffset(offset + limit)} />
        </Grid>
      </Grid>
    </Container>
  );
}
