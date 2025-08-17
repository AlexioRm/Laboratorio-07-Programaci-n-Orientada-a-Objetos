function Movimiento(nombre, tipo, valor) {
  this.nombre = nombre;
  this.tipo = tipo;
  this.valor = valor;
  this.fecha = new Date().toLocaleDateString();

  this.esIngreso = function() {
    return this.tipo === 'ingreso';
  };

  this.esGasto = function() {
    return this.tipo === 'gasto';
  };
}

function Categoria(nombre, tipo, limite) {
  this.nombre = nombre;
  this.tipo = tipo;
  this.limite = limite;

  this.puedeGastar = function(monto) {
    return this.tipo === 'gasto' && monto <= this.limite;
  };
}

function Presupuesto() {
  this.movimientos = [];
  this.fechaCreacion = new Date().toLocaleDateString();

  this.agregarMovimiento = function(movimiento) {
    if (movimiento instanceof Movimiento) {
      this.movimientos.push(movimiento);
      return true;
    }
    return false;
  };

  this.obtenerTotalIngresos = function() {
    return this.movimientos
      .filter(mov => mov.esIngreso())
      .reduce((total, mov) => total + mov.valor, 0);
  };

  this.obtenerTotalGastos = function() {
    return this.movimientos
      .filter(mov => mov.esGasto())
      .reduce((total, mov) => total + mov.valor, 0);
  };

  this.calcularBalance = function() {
    return this.obtenerTotalIngresos() - this.obtenerTotalGastos();
  };

  this.obtenerResumen = function() {
    return {
      totalIngresos: this.obtenerTotalIngresos(),
      totalGastos: this.obtenerTotalGastos(),
      balance: this.calcularBalance(),
      cantidadMovimientos: this.movimientos.length
    };
  };

  this.obtenerMovimientosPorTipo = function(tipo) {
    return this.movimientos.filter(mov => mov.tipo === tipo);
  };

  this.eliminarMovimiento = function(indice) {
    if (indice >= 0 && indice < this.movimientos.length) {
      return this.movimientos.splice(indice, 1)[0];
    }
    return null;
  };

  this.buscarMovimiento = function(nombre) {
    return this.movimientos.find(mov =>
      mov.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  };

  this.validarPresupuesto = function() {
    return this.movimientos.every(mov => mov instanceof Movimiento);
  };

  this.obtenerEstadisticas = function() {
    const ingresos = this.obtenerMovimientosPorTipo("ingreso");
    const gastos = this.obtenerMovimientosPorTipo("gasto");

    const promedioIngresos = ingresos.length > 0
      ? ingresos.reduce((t, m) => t + m.valor, 0) / ingresos.length
      : 0;

    const promedioGastos = gastos.length > 0
      ? gastos.reduce((t, m) => t + m.valor, 0) / gastos.length
      : 0;

    const mayorMovimiento = this.movimientos.length > 0
      ? this.movimientos.reduce((max, mov) => mov.valor > max.valor ? mov : max)
      : null;

    return {
      promedioIngresos,
      promedioGastos,
      mayorMovimiento
    };
  };
}
