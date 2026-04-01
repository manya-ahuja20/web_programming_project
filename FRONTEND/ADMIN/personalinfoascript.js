document.addEventListener('DOMContentLoaded', () => {
  const s = getSession();
  const users = getUsers();
  const user = users.find(u => u.id === s.userId);
 

  document.getElementById('pi-name').textContent = user.name || '';
  document.getElementById('pi-username').textContent = user.username || user.email || '';
  document.getElementById('pi-department').textContent = user.department || '';
  document.getElementById('pi-club').textContent = user.club || '';
 
 
  const editBtn = document.getElementById('edit-profile-btn');
  const editForm = document.getElementById('edit-profile-form');
  const editDept = document.getElementById('edit-department');
  const editClub = document.getElementById('edit-club');
  const cancelBtn = document.getElementById('cancel-edit');
  if (!editBtn || !editForm) return;

  editBtn.addEventListener('click', () => {
    editDept.value = user.department || '';
    editClub.value = user.club || '';
    editForm.style.display = 'block';
    editBtn.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    editBtn.style.display = 'inline-block';
  });

  editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) 
        return alert('User not found');
    users[idx].department = editDept.value.trim();
    users[idx].club = editClub.value.trim();
    saveUsers(users);
    user.department = users[idx].department;
    user.club = users[idx].club;

    document.getElementById('pi-department').textContent = users[idx].department;
    document.getElementById('pi-club').textContent = users[idx].club;
    editForm.style.display = 'none';
    editBtn.style.display = 'inline-block';
    alert('Profile updated');
  });
 

  const logout = document.getElementById('logout-btn');
  if (logout) 
    logout.addEventListener('click', () => clearSession());
});
