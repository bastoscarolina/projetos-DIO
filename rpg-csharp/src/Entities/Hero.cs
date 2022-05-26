namespace rpg_csharp.src.Entities
{
    public abstract class Hero //classe abstrata é uma classe mãe para que outras classes herdem dela, ela n constroi objeto
    {

        public Hero (string Name, int Level, string HeroType)
        {
            this.Name = Name;
            this.Level = Level;
            this.HeroType = HeroType;
        }

        public Hero (){

        }
        public string Name;
        public int Level;
        public string HeroType;

        public override string ToString() //sobrescrita de metodo herdado pela classe mãe
        {
            return this.Name + " " + this.Level + " " + this.HeroType;
        }

        public virtual string Attack(){
            return this.Name + " atacou com sua espada";
        }
    }
}