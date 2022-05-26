namespace rpg_csharp.src.Entities
{
    public class Wizard : Hero
    {
        public Wizard (string Name, int Level, string HeroType)
        {
            this.Name = Name;
            this.Level = Level;
            this.HeroType = HeroType;
        }
        public override string Attack(){
            return this.Name + " atacou com magia";
        }

        public string Attack(int Bonus){

            if(Bonus> 6){
                return this.Name + " atacou com magia super efetiva com bonus de " +  Bonus; //sobrecarga de método
            } else{
                return this.Name + " atacou com magia fraca com bonus de " +  Bonus;
            }
        }
    }
}