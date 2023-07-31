import { useEffect } from "react";

function Home({ username, fetchUser }) {

  useEffect(()=> {
    fetchUser();
  }, [])

  return (
    <div className="home">
      <h1>
        {username && `Welcome to the butterfly garden ${username}!`}
        {!username && "Welcome to the butterfly garden!"}
      </h1>

      <h3>Basics of Butterfly Gardening</h3>

      <section>
        <h4>How to Start a Butterfly Garden</h4>
        <div>
          <div className="desc">
            <p>
              Beginning a butterfly garden can be as simple as choosing
              flowering plants that will invite adult butterflies to your garden
              to feed. But if you want to create a butterfly garden that will
              act as a sanctuary, attracting a wide variety of butterflies while
              also providing a place where butterflies can grow and multiply,
              you will first need some simple planning. By considering which
              plants to grow and evaluating your garden site, you can plant a
              butterfly garden that will help with the creation of more
              butterflies.
            </p>
            <p>
              To attract native pollinators to your garden, we recommend
              planting native annuals and perennials that would typically be
              found in your area naturally. Butterflies see in ultraviolet
              light, so bright colored flowers with a lighter center can act as
              a target to help attract pollinators. Butterflies also prefer a
              space to land while feeding on the nectar, so native species with
              larger petals or petals that form in clumps will also help attract
              butterflies to your garden.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="picture"/>
        </div>
      </section>
      <section>
        <h4>Plant Selection</h4>
        <div>
          <div className="desc">
            <p>
              Many flowering plants will attract butterflies to your location,
              but not all flowers are created equally in the compound eyes of a
              butterfly. Selecting plants that will feed butterflies while also
              encouraging them to stick around for a while, laying eggs and
              creating a new generation of butterflies, is your goal. To do
              this, you will need to choose plants that fall into two groups:
              nectar plants that will provide adult butterflies with energy and
              caterpillar food plants that will feed caterpillars. With careful
              selection from these two groups, your garden will provide for the
              entire life cycle of butterflies.ß
            </p>
            <p>
              While shopping for garden plants, you will encounter many plants
              labeled “butterfly friendly.” These labels are most likely telling
              the truth and if you choose plants labeled for butterfly gardens,
              they will attract butterflies. Most likely, though, these plants
              are nectar plants, marketed for their bright blooms, and will not
              provide for the caterpillar stage of a butterfly’s life. Although
              many flowering plants provide nectar to butterflies, it is worth
              doing a little research to find you what plants attract the most
              butterflies in your area. Just as growing conditions vary by
              location, so do the popularity of butterfly nectar plants. Some
              plants will serve as both nectar and caterpillar food plants and
              it may be worth searching out some of these double duty offerings.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/4750335/pexels-photo-4750335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="picture"/>
        </div>
      </section>
      <section>
        <h4>Garden Site Selection</h4>
        <div>
          <div className="desc">
            <p>
              Planting a wide range of nectar and host plants is the best
              strategy for attracting the largest number of butterfly species.
              Butterflies may be attracted to the garden by a large patch of
              bright flowers, but they will linger longer if there are also
              areas that provide shelter, water, sun and a diverse group of
              plants that imitate the way plants grow in the wild.
            </p>
            <p>
              in the garden results from choosing plants of different types,
              such as shrubs, trees, perennials, and even vines. In choosing
              plants that grow to different heights, with a variety of flower
              shapes and colors that have different bloom times, you will be
              creating a garden that is attractive to a wide range of
              butterflies. Grouping more than one plant of each type together
              will help to unify the look of the garden and will lessen the
              distance that nectaring butterflies have to travel. If your garden
              is small and has no room for trees or shrubs, consider an arbor
              covered with vines to create height. There are many vines to
              choose from that act as nectar or caterpillar food plants.
            </p>
          </div>
          <img src="https://images.pexels.com/photos/4207905/pexels-photo-4207905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="picture" />
        </div>
      </section>
    </div>
  );
}
export default Home;
