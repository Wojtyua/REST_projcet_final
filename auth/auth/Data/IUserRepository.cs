using auth.Models;

namespace auth.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByUsername(string username);
        User GetById(int id);
        User UpdateUser(User user);
        User DeleteUser(int id);
    }
}
