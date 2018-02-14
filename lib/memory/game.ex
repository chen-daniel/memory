defmodule Memory.Game do

  def new() do
    %{
      tiles: generateTiles(),
      guesses: 0,
      firstGuessIndex: -1,
      secondGuessIndex: -1,
      disabled: false
    };
  end

  def client_view(game) do
    %{
      tiles: game.tiles,
      guesses: game.guesses,
      firstGuessIndex: -1,
      secondGuessIndex: -1,
      disabled: false
    };
  end

  def generateTiles() do
    letters = "ABCDEFGH"
    lettersList = String.split(letters, "", trim: true)

    lettersList
    |> Enum.concat(lettersList)
    |> Enum.shuffle()
    |> Enum.with_index()
    |> Enum.map(fn x ->
      %{
        index: elem(x, 1),
        value: elem(x, 0),
        flipped: false,
        matched: false
      }
    end)
  end


  def handleClick(game, id) do
    if game.disabled == true do
      IO.puts "ahhhh"
      game
    else
      tiles = game.tiles
      guesses = game.guesses
      firstGuessIndex = game.firstGuessIndex
      secondGuessIndex = game.secondGuessIndex
      disabled = game.disabled

      if firstGuessIndex != -1 do
        disabled = true
        secondGuessIndex = id
        newTiles =
          tiles
          |> Enum.map(fn x ->
            if x.index == id do
              Map.put(x, :flipped, true)
            else
              x
            end
          end)
      else
        firstGuessIndex = id
        newTiles =
          tiles
          |> Enum.map(fn x ->
            if x.index == id do
              Map.put(x, :flipped, true)
            else
              x
            end
          end)
      end

      %{
        tiles: newTiles,
        guesses: guesses,
        firstGuessIndex: firstGuessIndex,
        secondGuessIndex: secondGuessIndex,
        disabled: disabled
      }
    end
  end

  def handleMatch(game) do
    tiles = game.tiles
    guesses = game.guesses
    firstGuessIndex = game.firstGuessIndex
    secondGuessIndex = game.secondGuessIndex
    disabled = game.disabled

    guesses = guesses + 1
    firstTile = elem(Enum.fetch(tiles, firstGuessIndex), 1)
    secondTile = elem(Enum.fetch(tiles, secondGuessIndex), 1)


    if firstTile.value == secondTile.value do
      newTiles =
        tiles
        |> Enum.map(fn x ->
          if x.index == firstGuessIndex || x.index == secondGuessIndex do
            Map.put(x, :matched, true)
          else
            x
          end
        end)
    else
      newTiles =
        tiles
        |> Enum.map(fn x ->
          if x.index == firstGuessIndex || x.index == secondGuessIndex do
            Map.put(x, :flipped, false)
          else
            x
          end
        end)
    end

    %{
      tiles: newTiles,
      guesses: guesses,
      firstGuessIndex: -1,
      secondGuessIndex: -1,
      disabled: false
    }
  end
end
